import { useState, useEffect, useCallback } from "react";
import { Box, Button, Collapse, Grid, Paper } from "@mui/material";
import { breadcrumbs } from "./breadcrumbs";
import FormSubscriptions from "./Form";
import {
  createSubscription,
  listSubscriptions,
  updateSubscription,
} from "../../../services/subscriptions";
import { ListAll } from "./ListAll";
import { Alerts } from "../../../utils/alerts";
import { HeaderBar } from "../../molecules/HeaderBar";
import { DeleteDialog } from "./DeleteDialog";

const initialEmpty = {
  id: "",
  card: "",
  name: "",
  billingDay: "",
  value: "",
  repeatBy: "",
  period: "",
};

const fields = ["card", "name", "billingDay", "value", "repeatBy", "period"];

function SubscriptionPage() {
  const [showForm, setShowForm] = useState(false);
  const [showDialogDelete, setShowDialogDelete] = useState(false);
  const [feedback, setFeedback] = useState(false);
  const [selectedItem, setSelectedItem] = useState(initialEmpty);
  const [validateFields] = useState(fields);
  const [subscriptions, setSubscriptions] = useState([]);

  async function getSubscriptions() {
    const data = await listSubscriptions();
    setSubscriptions(data);
  }

  async function onSave(values) {
    let response = null;
    let feedback = null;
    if (!values.id) {
      response = await createSubscription(values);
      feedback = "Assinatura adicionada com sucesso!";
    } else {
      response = await updateSubscription(values.id, values);
      feedback = "Assinatura alterada com sucesso!";
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
      getSubscriptions();
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
    getSubscriptions();
  }, []);

  const handleClickOnNewOrEdit = useCallback((card) => {
    setSelectedItem(card);
    setShowForm(true);
  }, []);

  const handleClickOnDelete = useCallback((card) => {
    setSelectedItem(card);
    setShowDialogDelete(true);
  }, []);

  function handleDialogDeleteClose() {
    setShowDialogDelete(false);
  }

  function handleDialogDeleteCancel() {
    setShowDialogDelete(false);
  }

  function handleDialogDeleteConfirm() {
    setShowDialogDelete(false);
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
                Nova
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
              <FormSubscriptions
                data={selectedItem}
                fields={validateFields}
                onCancel={onCancel}
                onClose={() => setShowForm(false)}
                onConfirm={onSave}
              />
            </Paper>
          </Collapse>

          <Box>
            <ListAll
              data={subscriptions}
              onEdit={handleClickOnNewOrEdit}
              onDelete={handleClickOnDelete}
            />
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

export { SubscriptionPage };
