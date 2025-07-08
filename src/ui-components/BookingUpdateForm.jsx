/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getBooking } from "../graphql/queries";
import { updateBooking } from "../graphql/mutations";
const client = generateClient();
export default function BookingUpdateForm(props) {
  const {
    id: idProp,
    booking: bookingModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    studentID: "",
    tutorID: "",
    time: "",
    status: "",
    createdAt: "",
  };
  const [studentID, setStudentID] = React.useState(initialValues.studentID);
  const [tutorID, setTutorID] = React.useState(initialValues.tutorID);
  const [time, setTime] = React.useState(initialValues.time);
  const [status, setStatus] = React.useState(initialValues.status);
  const [createdAt, setCreatedAt] = React.useState(initialValues.createdAt);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = bookingRecord
      ? { ...initialValues, ...bookingRecord }
      : initialValues;
    setStudentID(cleanValues.studentID);
    setTutorID(cleanValues.tutorID);
    setTime(cleanValues.time);
    setStatus(cleanValues.status);
    setCreatedAt(cleanValues.createdAt);
    setErrors({});
  };
  const [bookingRecord, setBookingRecord] = React.useState(bookingModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getBooking.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getBooking
        : bookingModelProp;
      setBookingRecord(record);
    };
    queryData();
  }, [idProp, bookingModelProp]);
  React.useEffect(resetStateValues, [bookingRecord]);
  const validations = {
    studentID: [{ type: "Required" }],
    tutorID: [{ type: "Required" }],
    time: [{ type: "Required" }],
    status: [{ type: "Required" }],
    createdAt: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  const convertToLocal = (date) => {
    const df = new Intl.DateTimeFormat("default", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      calendar: "iso8601",
      numberingSystem: "latn",
      hourCycle: "h23",
    });
    const parts = df.formatToParts(date).reduce((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {});
    return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          studentID,
          tutorID,
          time,
          status,
          createdAt: createdAt ?? null,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: updateBooking.replaceAll("__typename", ""),
            variables: {
              input: {
                id: bookingRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "BookingUpdateForm")}
      {...rest}
    >
      <TextField
        label="Student id"
        isRequired={true}
        isReadOnly={false}
        value={studentID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              studentID: value,
              tutorID,
              time,
              status,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.studentID ?? value;
          }
          if (errors.studentID?.hasError) {
            runValidationTasks("studentID", value);
          }
          setStudentID(value);
        }}
        onBlur={() => runValidationTasks("studentID", studentID)}
        errorMessage={errors.studentID?.errorMessage}
        hasError={errors.studentID?.hasError}
        {...getOverrideProps(overrides, "studentID")}
      ></TextField>
      <TextField
        label="Tutor id"
        isRequired={true}
        isReadOnly={false}
        value={tutorID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              studentID,
              tutorID: value,
              time,
              status,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.tutorID ?? value;
          }
          if (errors.tutorID?.hasError) {
            runValidationTasks("tutorID", value);
          }
          setTutorID(value);
        }}
        onBlur={() => runValidationTasks("tutorID", tutorID)}
        errorMessage={errors.tutorID?.errorMessage}
        hasError={errors.tutorID?.hasError}
        {...getOverrideProps(overrides, "tutorID")}
      ></TextField>
      <TextField
        label="Time"
        isRequired={true}
        isReadOnly={false}
        type="datetime-local"
        value={time && convertToLocal(new Date(time))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              studentID,
              tutorID,
              time: value,
              status,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.time ?? value;
          }
          if (errors.time?.hasError) {
            runValidationTasks("time", value);
          }
          setTime(value);
        }}
        onBlur={() => runValidationTasks("time", time)}
        errorMessage={errors.time?.errorMessage}
        hasError={errors.time?.hasError}
        {...getOverrideProps(overrides, "time")}
      ></TextField>
      <TextField
        label="Status"
        isRequired={true}
        isReadOnly={false}
        value={status}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              studentID,
              tutorID,
              time,
              status: value,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.status ?? value;
          }
          if (errors.status?.hasError) {
            runValidationTasks("status", value);
          }
          setStatus(value);
        }}
        onBlur={() => runValidationTasks("status", status)}
        errorMessage={errors.status?.errorMessage}
        hasError={errors.status?.hasError}
        {...getOverrideProps(overrides, "status")}
      ></TextField>
      <TextField
        label="Created at"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={createdAt && convertToLocal(new Date(createdAt))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              studentID,
              tutorID,
              time,
              status,
              createdAt: value,
            };
            const result = onChange(modelFields);
            value = result?.createdAt ?? value;
          }
          if (errors.createdAt?.hasError) {
            runValidationTasks("createdAt", value);
          }
          setCreatedAt(value);
        }}
        onBlur={() => runValidationTasks("createdAt", createdAt)}
        errorMessage={errors.createdAt?.errorMessage}
        hasError={errors.createdAt?.hasError}
        {...getOverrideProps(overrides, "createdAt")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || bookingModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || bookingModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
