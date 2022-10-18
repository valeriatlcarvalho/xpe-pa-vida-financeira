import { useState, useEffect } from "react";
import { Box, Button, Collapse, Grid, Paper } from "@mui/material";
import { breadcrumbs } from "./breadcrumbs";
import FormCards from "./Form";
import { createCard, listCards, updateCard, deleteCard } from "../../../services/cards";
import { ListAll } from "./ListAll";
import { Alerts } from "../../../utils/alerts";
import { HeaderBar } from "../../molecules/HeaderBar";
import { CircularProgress } from "../../atoms/CircularProgress";
import { DeleteDialog } from "./DeleteDialog";

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
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showDialogDelete, setShowDialogDelete] = useState(false);
  const [feedback, setFeedback] = useState(false);
  const [selectedItem, setSelectedItem] = useState(initialEmpty);
  const [validateFields] = useState(fields);
  const [cards, setCards] = useState([]);

  async function getCards() {
    setIsLoading(true);
    listCards()
      .then((response) => {
        setCards(response);
      })
      .catch(() => {
        setFeedback({
          message: "Ocorreu um problema ao recuperar os cartões.",
          severity: "error",
          onClose: () => {
            setFeedback(null);
          },
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  async function onSave(values) {
    setIsLoading(true);
    if (!values.id) {
      createCard(values)
        .then(async () => {
          setShowForm(false);
          await getCards();
          setFeedback({
            message: "Cartão cadastrado com sucesso!",
            severity: "success",
            onClose: () => {
              setFeedback(null);
            },
          });
        })
        .catch(() => {
          setFeedback({
            message: "Ocorreu um erro ao cadastrar o cartão.",
            severity: "error",
            onClose: () => {
              setFeedback(null);
            },
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      updateCard(values.id, values)
      .then(async () => {
        setShowForm(false);
        await getCards();
        setFeedback({
          message: "Cartão editado com sucesso!",
          severity: "success",
          onClose: () => {
            setFeedback(null);
          },
        });
      })
      .catch(() => {
        setFeedback({
          message: "Ocorreu um erro ao editar o cartão.",
          severity: "error",
          onClose: () => {
            setFeedback(null);
          },
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
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
    if (showDialogDelete === false) {
      setSelectedItem(initialEmpty);
    }
  }, [showDialogDelete]);

  useEffect(() => {
    getCards();
  }, []);

  function handleClickOnNewOrEdit(card) {
    setSelectedItem(card);
    setShowForm(true);
  }

  function handleClickOnDelete(card) {
    setSelectedItem(card);
    setShowDialogDelete(true);
  }

  function handleDialogDeleteClose() {
    setShowDialogDelete(false);
  }

  function handleDialogDeleteCancel() {
    setShowDialogDelete(false);
  }

  async function handleDialogDeleteConfirm() {
    deleteCard(selectedItem.id)
      .then(() => {
        setShowDialogDelete(false);
        getCards();
        setFeedback({
          message: "Assinatura excluída com sucesso.",
          severity: "success",
          onClose: () => {
            setFeedback(null);
          },
        });
      })
      .catch(() => {
        setFeedback({
          message: "Assinatura não pôde ser excluída.",
          severity: "error",
          onClose: () => {
            setFeedback(null);
          },
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <Grid container mb={2}>
      <Grid item xs={12} display="flex" justifyContent="flex-end">
        <Box>
          <HeaderBar breadcrumbs={breadcrumbs} sx={{ my: 2 }}>
            <Box display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleClickOnNewOrEdit(initialEmpty)}
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
            {isLoading ? (
              <CircularProgress />
            ) : (
              <ListAll
                data={cards}
                onEdit={handleClickOnNewOrEdit}
                onDelete={handleClickOnDelete}
              />
            )}
          </Box>

          <DeleteDialog
            title={selectedItem.name}
            show={showDialogDelete}
            onClose={handleDialogDeleteClose}
            onCancel={handleDialogDeleteCancel}
            onConfirm={handleDialogDeleteConfirm}
          />
        </Box>
      </Grid>
    </Grid>
  );
}

export { CreditCardPage };
