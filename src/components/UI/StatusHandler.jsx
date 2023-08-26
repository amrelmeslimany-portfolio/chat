import { Alert } from "antd";
import React from "react";
import { STATUS } from "../../constants/words";

const StatusHandler = ({ status, success, error }) => {
  return (
    <>
      {success && status === STATUS.success && (
        <Alert message={success} closable={true} type="success" />
      )}
      {status === STATUS.error && (
        <Alert message={error} type="error" closable={true} />
      )}
    </>
  );
};

export default StatusHandler;
