import { useCallback, useState, useEffect } from "react";
import { Grid, IconButton, List, ListItem, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { digits, money } from "../../../utils/format";
import { listCards } from "../../../services/cards";

function ListAll({ data, onEdit, onDelete }) {
  const [cards, setCards] = useState([]);

  async function getCards() {
    const cardsData = await listCards();
    setCards(cardsData);
  }

  useEffect(() => {
    getCards();
  }, []);

  const getCardName = useCallback(
    (id) => {
      const found = cards.find((card) => String(card.id) === String(id));
      return found?.name;
    },
    [cards]
  );

  return (
    <List>
      {data.map((item, index) => (
        <ListItem sx={{ px: 0, py: 2 }} divider={index < data.length - 1}>
          <Grid container display="flex" direction="column">
            <Grid container item>
              <Grid item xs={12} md={6} display="flex" direction="column">
                <Typography component="h4" variant="h5" color="text.primary">
                  {item.name}
                </Typography>
              </Grid>

              <Grid
                container
                item
                xs={12}
                md={6}
                display="flex"
                alignItems="start"
                justifyContent="flex-end"
              >
                <Grid item>
                  <IconButton
                    onClick={() => onEdit(item)}
                    color="primary"
                    size="small"
                    variant="outlined"
                  >
                    <EditIcon />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton
                    onClick={() => onDelete(item)}
                    color="primary"
                    size="small"
                    variant="outlined"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>

            <Grid
              container
              item
              display="flex"
              alignItems="end"
              justifyContent="flex-start"
              spacing={2}
            >
              <Grid item xs={12} md={6} display="flex" direction="column">
                <Typography
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Cartão de crédito {getCardName(item.card)}
                </Typography>
                <Typography
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Data de cobrança {digits(item.billingDay, 2)}
                </Typography>
              </Grid>

              <Grid
                item
                xs={12}
                md={6}
                display="flex"
                direction="column"
                justifyContent="flex-end"
              >
                <Typography
                  component="span"
                  variant="h5"
                  color="text.primary"
                  align="right"
                >
                  {money(item.value)}
                </Typography>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Typography
                    component="span"
                    variant="body2"
                    color="text.primary"
                    align="right"
                  >
                    {`Repete-se a cada ${item.repeatBy} ${item.period}`}
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </ListItem>
      ))}
    </List>
  );
}

export { ListAll };
