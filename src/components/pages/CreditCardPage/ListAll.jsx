import {
  Chip,
  Grid,
  IconButton,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { digits, money } from "../../../utils/format";

function ListAll({ data, onOpenForm }) {
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
                    onClick={() => onOpenForm(item)}
                    color="primary"
                    size="small"
                    variant="outlined"
                  >
                    <EditIcon />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton
                    onClick={() => onOpenForm(item)}
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
              <Grid item xs={4} display="flex" direction="column">
                <Typography
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Data de fechamento {digits(item.closingDay, 2)}
                </Typography>
                <Typography
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Data de vencimento {digits(item.dueDay, 2)}
                </Typography>
              </Grid>

              <Grid item xs={4} display="flex" direction="column">
                <Typography
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Limite {money(item.limit)}
                </Typography>
                <Typography
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Total de faturas a pagar {money(item.futureInvoices)}
                </Typography>
                <Typography
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Limite disponível {money(item.availableLimit)}
                </Typography>
              </Grid>

              <Grid
                item
                xs={4}
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
                  {money(item.invoice)}
                </Typography>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Chip size="small" color="error" label="Fechada" />
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
