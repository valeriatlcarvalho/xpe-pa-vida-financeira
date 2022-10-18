import { useState, useEffect, useCallback } from "react";
import { Box, Button, Collapse, Grid, Paper } from "@mui/material";
import { breadcrumbs } from "./breadcrumbs";
import FormCards from "./Form";
import { createCard, listCards, updateCard } from "../../../services/cards";
import { ListAll } from "./ListAll";
import { Alerts } from "../../../utils/alerts";
import { HeaderBar } from "../../molecules/HeaderBar";

const initialEmpty = {
  id: "",
  flag: "",
  name: "",
  closingDay: "",
  dueDay: "",
  limit: "",
  bankAccount: "",
  invoice: "",
  availableLimit: "",
  futureInvoices: "",
};

const fields = ["flag", "name", "closingDay", "dueDay", "limit", "bankAccount"];

function CreditCardPage() {
  const [showForm, setShowForm] = useState(false);
  const [feedback, setFeedback] = useState(false);
  const [selectedItem, setSelectedItem] = useState(initialEmpty);
  const [validateFields] = useState(fields);
  const [cards, setCards] = useState([]);

  async function getCards() {
    const data = await listCards();
    setCards(data);
  }

  async function onSave(values) {
    let response = null;
    let feedback = null;
    if (!values.id) {
      response = await createCard(values);
      feedback = "Cartão de crédito adicionado com sucesso!";
    } else {
      response = await updateCard(values.id, values);
      feedback = "Cartão de crédito alterado com sucesso!";
    }

    if (response) {
      setFeedback({
        message: feedback,
        severity: "success",
        onClose: () => {
          setFeedback(null);
        },
      });
      setShowForm(false);
      getCards();
    }
  }

  function onCancel() {
    setShowForm(false);
  }

  useEffect(() => {
    if (showForm === false) {
      setSelectedItem(initialEmpty);
    }
  }, [showForm]);

  useEffect(() => {
    getCards();
  }, []);

  const openForm = useCallback((card) => {
    setSelectedItem(card);
    setShowForm(true);
  }, []);

  return (
    <Grid container mb={2}>
      <Grid item xs={12} display="flex" justifyContent="flex-end">
        <Box>
          <HeaderBar breadcrumbs={breadcrumbs} sx={{ my: 2 }}>
            <Box display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                color="secondary"
                onClick={() => openForm(initialEmpty)}
              >
                Novo
              </Button>
            </Box>
          </HeaderBar>

          {feedback && (
            <Box sx={{ my: 2 }}>
              <Alerts
                message={feedback.message}
                severity={feedback.severity}
                onClose={feedback.onClose}
              />
            </Box>
          )}

          <Collapse in={showForm}>
            <Paper elevation={0} variant="outlined" sx={{ p: 2, my: 2 }}>
              <FormCards
                data={selectedItem}
                fields={validateFields}
                onCancel={onCancel}
                onClose={() => setShowForm(false)}
                onConfirm={onSave}
              />
            </Paper>
          </Collapse>

          <Box>
            <ListAll data={cards} onOpenForm={openForm} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export { CreditCardPage };
