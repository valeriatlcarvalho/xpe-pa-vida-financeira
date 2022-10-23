import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Collapse,
  FormControl,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { breadcrumbs } from "./breadcrumbs";
import FormSubscriptions from "./Form";
import {
  createSubscription,
  listSubscriptions,
  updateSubscription,
  deleteSubscription,
} from "../../../services/subscriptions";
import { ListAll } from "./ListAll";
import { Alerts } from "../../../utils/alerts";
import { HeaderBar } from "../../molecules/HeaderBar";
import { DeleteDialog } from "./DeleteDialog";
import { CircularProgress } from "../../atoms/CircularProgress";
import { listCards } from "../../../services/cards";
import { useCallback } from "react";

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
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showDialogDelete, setShowDialogDelete] = useState(false);
  const [feedback, setFeedback] = useState(false);
  const [selectedItem, setSelectedItem] = useState(initialEmpty);
  const [validateFields] = useState(fields);
  const [subscriptions, setSubscriptions] = useState([]);
  const [cards, setCards] = useState([]);
  const [filterByCard, setFilterByCard] = useState(null);

  async function getCards() {
    const cardsData = await listCards();
    setCards(cardsData);
  }

  useEffect(() => {
    getCards();
  }, []);

  async function getSubscriptions(params) {
    setIsLoading(true);
    listSubscriptions(params)
      .then((response) => {
        setSubscriptions(response);
      })
      .catch(() => {
        setFeedback({
          message: "Ocorreu um problema ao recuperar as assinaturas.",
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
      createSubscription(values)
        .then(async () => {
          setShowForm(false);
          await getSubscriptions();
          setFeedback({
            message: "Assinatura cadastrada com sucesso!",
            severity: "success",
            onClose: () => {
              setFeedback(null);
            },
          });
        })
        .catch(() => {
          setFeedback({
            message: "Ocorreu um erro ao cadastrar a assinatura.",
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
      updateSubscription(values.id, values)
        .then(async () => {
          setShowForm(false);
          await getSubscriptions();
          setFeedback({
            message: "Assinatura editada com sucesso!",
            severity: "success",
            onClose: () => {
              setFeedback(null);
            },
          });
        })
        .catch(() => {
          setFeedback({
            message: "Ocorreu um erro ao editar a assinatura.",
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
    getSubscriptions();
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
    deleteSubscription(selectedItem.id)
      .then(() => {
        setShowDialogDelete(false);
        getSubscriptions();
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

  const renderCardsOptions = useCallback(() => {
    let options = [
      <MenuItem value={null} selected>
        Todos
      </MenuItem>,
    ];

    cards.forEach((card) => {
      options.push(
        <MenuItem value={card.id} key={`filter-by-card-${card.id}`}>
          {card.name}
        </MenuItem>
      );
    });

    return options;
  }, [cards]);

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

          <Box
            sx={{
              borderStyle: "dashed",
              borderWidth: "1px",
              borderRadius: 2,
              borderColor: "secondary.main",
              p: 2,
              mt: 2,
            }}
          >
            <Grid container item xs={12} md={6} lg={4} xl={3}>
              <Typography variant="body2" mb={2}>
                Ver assinaturas vinculadas por cartão:
              </Typography>
              <FormControl fullWidth>
                <TextField
                  label="Cartão de crédito"
                  variant="outlined"
                  select
                  value={filterByCard}
                  onChange={(event) => {
                    setFilterByCard(event.target.value);
                    if (event.target.value === null) {
                      getSubscriptions({});
                    } else {
                      getSubscriptions({ card: event.target.value });
                    }
                  }}
                  name="card"
                  helperText={""}
                >
                  {renderCardsOptions()}
                </TextField>
              </FormControl>
            </Grid>
          </Box>

          <Box>
            {isLoading ? (
              <CircularProgress />
            ) : (
              <ListAll
                data={subscriptions}
                cards={cards}
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

export { SubscriptionPage };
