import React from "react";
import { useDispatch } from "react-redux";

import { useFormik } from "formik";
import * as Yup from "yup";

import { TextField, Button } from "@material-ui/core";
import { errorHelper } from "../../../utils/forms/errorHandler";
import { addCategory } from "../../../store/actions/article_actions";

const AddCategories = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { name: "" },
    validationSchema: Yup.object({
      name: Yup.string().required("The name is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      //// go to the server
      dispatch(addCategory(values));
      resetForm();
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <TextField
            style={{ width: "100%" }}
            name="name"
            label="Enter a name"
            variant="outlined"
            {...formik.getFieldProps("name")}
            {...errorHelper(formik, "name")}
          />
        </div>
        <br />
        <Button variant="contained" color="primary" type="submit">
          Add category
        </Button>
      </form>
    </>
  );
};

export default AddCategories;
