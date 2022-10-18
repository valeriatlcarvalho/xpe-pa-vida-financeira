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

const initialFieldsValues = {
  flag: "",
  name: "",
  closingDay: "",
  dueDay: "",
  limit: "",
  bankAccount: "",
};

const initialErrorsFields = {
  flag: false,
  name: false,
  closingDay: false,
  dueDay: false,
  limit: false,
  bankAccount: false,
};

function FormCards({ data, fields, onCancel, onClose, onConfirm }) {
  const [formData, setFormData] = useState(data || initialFieldsValues);
  const [isEditing] = useState(() => {
    if (!data?.id) return false;
    return true;
  });
  const [errors, setErrors] = useState(initialErrorsFields);
  const [isValid, setIsValid] = useState(true);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    setFormData(data);
  }, [data]);

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

  const validateForm = useCallback(
    (event) => {
      const formValues = entriesToObject(getFormValues(event));
      console.log(formValues);
      setFormData(formValues);

      const formErrors = getErrors(formValues, fields);
      setErrors(formErrors);

      setIsValid(formIsValid(formErrors));
    },
    [fields]
  );

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      setIsSending(true);

      validateForm(event);
    },
    [validateForm]
  );

  useEffect(() => {
    console.log(isValid);
    console.log(isSending);
    if (!!isValid && !!isSending && !!onConfirm) {
      onConfirm(formData);
      setIsSending(false);
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
          <input name="invoice" value={formData?.invoice} hidden />
          <input
            name="availableLimit"
            value={formData?.availableLimit}
            hidden
          />
          <input
            name="futureInvoices"
            value={formData?.futureInvoices}
            hidden
          />

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography
                id="modal-modal-title"
                variant="h5"
                component="h4"
                textAlign="center"
              >
                {isEditing ? "Editando" : "Cadastro de cartão de crédito"}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6} lg={4} xl={3}>
              <FormControl fullWidth>
                <TextField
                  label="Bandeira"
                  variant="outlined"
                  value={formData?.flag}
                  onChange={(event) => {
                    handleChangeField({
                      name: "flag",
                      value: event.target.value,
                    });
                  }}
                  name="flag"
                  select
                  required
                  error={errors.flag}
                  helperText={errors.flag ? "Campo obrigatório" : ""}
                >
                  <MenuItem value="" disabled selected>
                    Selecione...
                  </MenuItem>
                  <MenuItem value="maestro">Maestro</MenuItem>
                  <MenuItem value="mastercard">Mastercard</MenuItem>
                  <MenuItem value="visa">Visa</MenuItem>
                </TextField>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6} lg={4} xl={3}>
              <FormControl fullWidth>
                <TextField
                  label="Nome do cartão"
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
                  label="Dia do fechamento da fatura"
                  variant="outlined"
                  select
                  value={formData?.closingDay}
                  onChange={(event) => {
                    handleChangeField({
                      name: "closingDay",
                      value: event.target.value,
                    });
                  }}
                  name="closingDay"
                  required
                  error={errors.closingDay}
                  helperText={errors.closingDay ? "Campo obrigatório" : ""}
                >
                  {renderListDays("closingDay").map((day) => day)}
                </TextField>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6} lg={4} xl={3}>
              <FormControl fullWidth>
                <TextField
                  label="Dia do vencimento da fatura"
                  variant="outlined"
                  select
                  value={formData?.dueDay}
                  onChange={(event) => {
                    handleChangeField({
                      name: "dueDay",
                      value: event.target.value,
                    });
                  }}
                  name="dueDay"
                  required
                  error={errors.dueDay}
                  helperText={errors.dueDay ? "Campo obrigatório" : ""}
                >
                  {renderListDays("dueDay").map((day) => day)}
                </TextField>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6} lg={4} xl={3}>
              <FormControl fullWidth>
                <TextField
                  label="Limite"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">R$</InputAdornment>
                    ),
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                  }}
                  value={formData?.limit}
                  onChange={(event) => {
                    handleChangeField({
                      name: "limit",
                      value: event.target.value,
                    });
                    handleChangeField({
                      name: "availableLimit",
                      value: event.target.value,
                    });
                  }}
                  name="limit"
                  required
                  error={errors.limit}
                  helperText={errors.limit ? "Campo obrigatório" : ""}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6} lg={4} xl={3}>
              <FormControl fullWidth>
                <TextField
                  label="Conta padrão para pagamento"
                  variant="outlined"
                  select
                  value={formData?.bankAccount}
                  onChange={(event) => {
                    handleChangeField({
                      name: "bankAccount",
                      value: event.target.value,
                    });
                  }}
                  name="bankAccount"
                  required
                  error={errors.bankAccount}
                  helperText={errors.bankAccount ? "Campo obrigatório" : ""}
                >
                  <MenuItem value="" disabled selected>
                    Selecione...
                  </MenuItem>
                  <MenuItem value="conta-corrente">Conta corrente</MenuItem>
                  <MenuItem value="conta-poupanca">Conta poupança</MenuItem>
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

export default FormCards;
