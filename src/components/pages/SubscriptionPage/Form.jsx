import { useCallback, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { entriesToObject } from "../../../utils/entriesToObject";
import { renderListDays } from "../../../utils/renderDays";
import {
  formIsValid,
  getFormValues,
  getErrors,
} from "../../../utils/validateForm";
import { useEffect } from "react";
import { listCards } from "../../../services/cards";

const initialFieldsValues = {
  card: "",
  name: "",
  billingDay: "",
  value: "",
  repeatBy: "",
  period: "",
};

const initialErrorsFields = {
  card: false,
  name: false,
  billingDay: false,
  value: false,
  repeatBy: false,
  period: false,
};

function FormSubscriptions({ data, fields, onCancel, onClose, onConfirm }) {
  const [formData, setFormData] = useState(data || initialFieldsValues);
  const [isEditing] = useState(() => {
    if (!data?.id) return false;
    return true;
  });
  const [errors, setErrors] = useState(initialErrorsFields);
  const [isValid, setIsValid] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [cards, setCards] = useState([]);

  async function getCards() {
    const cardsData = await listCards();
    setCards(cardsData);
  }

  useEffect(() => {
    setFormData(data);
    getCards();
  }, [data]);

  const populateCards = useCallback(() => {
    return cards.map((card) => (
      <MenuItem value={card.id} key={card.id}>
        {card.name}
      </MenuItem>
    ));
  }, [cards]);

  function resetForm() {
    setFormData(initialFieldsValues);
    setErrors(initialErrorsFields);
    setIsValid(true);
  }

  const handleChangeField = useCallback(({ name, value }) => {
    setFormData((oldFormData) => ({
      ...oldFormData,
      [name]: value,
    }));

    if (!!value) {
      setErrors((oldErrors) => {
        const newErrors = {
          ...oldErrors,
          [name]: false,
        };
        const isFormValid = formIsValid(newErrors);
        setIsValid(isFormValid);

        return newErrors;
      });
    }
  }, []);

  function validateForm(event) {
    const formValues = entriesToObject(getFormValues(event));
    setFormData(formValues);

    const formErrors = getErrors(formValues, fields);
    setErrors(formErrors);

    setIsValid(formIsValid(formErrors));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setIsSending(true);

    validateForm(event);
  }

  useEffect(() => {
    if (isSending && isValid) {
      if (onConfirm) {
        onConfirm(formData);
        setIsSending(false);
      }
    }
  }, [isValid, formData, onConfirm, isSending]);

  function handleCancel() {
    resetForm();
    setIsSending(false);

    if (onCancel) onCancel();
  }

  return (
    <Grid container>
      <Grid item xs={12} margin="auto">
        <Box display="flex" justifyContent="flex-end">
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              resetForm();
              if (onClose) onClose();
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        </Box>

        <form onSubmit={handleSubmit} noValidate>
          <input name="id" value={formData?.id} hidden />

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography
                id="modal-modal-title"
                variant="h5"
                component="h4"
                textAlign="center"
              >
                {isEditing ? "Editando" : "Cadastro de assinatura"}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6} lg={4} xl={3}>
              <FormControl fullWidth>
                <TextField
                  label="Cartão de crédito"
                  variant="outlined"
                  value={formData?.card}
                  onChange={(event) => {
                    handleChangeField({
                      name: "card",
                      value: event.target.value,
                    });
                  }}
                  name="card"
                  select
                  required
                  error={errors.card}
                  helperText={errors.card ? "Campo obrigatório" : ""}
                >
                  <MenuItem value="" disabled selected>
                    Selecione...
                  </MenuItem>
                  {populateCards()}
                </TextField>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6} lg={4} xl={3}>
              <FormControl fullWidth>
                <TextField
                  label="Nome da assinatura"
                  variant="outlined"
                  value={formData?.name}
                  onChange={(event) => {
                    handleChangeField({
                      name: "name",
                      value: event.target.value,
                    });
                  }}
                  name="name"
                  required
                  error={errors.name}
                  helperText={errors.name ? "Campo obrigatório" : ""}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6} lg={4} xl={3}>
              <FormControl fullWidth>
                <TextField
                  label="Dia da cobrança"
                  variant="outlined"
                  select
                  value={formData?.billingDay}
                  onChange={(event) => {
                    handleChangeField({
                      name: "billingDay",
                      value: event.target.value,
                    });
                  }}
                  name="billingDay"
                  required
                  error={errors.billingDay}
                  helperText={errors.billingDay ? "Campo obrigatório" : ""}
                >
                  {renderListDays("billingDay").map((day) => day)}
                </TextField>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6} lg={4} xl={3}>
              <FormControl fullWidth>
                <TextField
                  label="Valor da assinatura"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">R$</InputAdornment>
                    ),
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                  }}
                  value={formData?.value}
                  onChange={(event) => {
                    handleChangeField({
                      name: "value",
                      value: event.target.value,
                    });
                  }}
                  name="value"
                  required
                  error={errors.value}
                  helperText={errors.value ? "Campo obrigatório" : ""}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6} lg={4} xl={3}>
              <FormControl fullWidth>
                <TextField
                  label="Repetir a cada"
                  variant="outlined"
                  InputProps={{
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                  }}
                  value={formData?.repeatBy}
                  onChange={(event) => {
                    handleChangeField({
                      name: "repeatBy",
                      value: event.target.value,
                    });
                  }}
                  name="repeatBy"
                  required
                  error={errors.repeatBy}
                  helperText={errors.repeatBy ? "Campo obrigatório" : ""}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6} lg={4} xl={3}>
              <FormControl fullWidth>
                <TextField
                  label="Período"
                  variant="outlined"
                  select
                  value={formData?.period}
                  onChange={(event) => {
                    handleChangeField({
                      name: "period",
                      value: event.target.value,
                    });
                  }}
                  name="period"
                  required
                  error={errors.period}
                  helperText={errors.period ? "Campo obrigatório" : ""}
                >
                  <MenuItem value="" disabled selected>
                    Selecione...
                  </MenuItem>
                  <MenuItem value="day">Dias</MenuItem>
                  <MenuItem value="week">Semanas</MenuItem>
                  <MenuItem value="month">Meses</MenuItem>
                  <MenuItem value="year">Anos</MenuItem>
                </TextField>
              </FormControl>
            </Grid>

            <Grid item xs={12} mt={2} display="flex" justifyContent="end">
              <Grid item mr={2}>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleCancel}
                >
                  Cancelar
                </Button>
              </Grid>

              <Grid item>
                <Button variant="contained" type="submit" disabled={!isValid}>
                  Salvar
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
}

export default FormSubscriptions;
