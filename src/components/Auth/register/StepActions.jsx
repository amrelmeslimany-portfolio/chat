import { Button } from "antd";

const StepActions = ({
  currentStep,
  stepsSize,
  onNext,
  onPrevious,
  loading,
}) => {
  return (
    <div style={{ display: "flex", gap: 5 }}>
      {currentStep > 0 && (
        <Button
          size="large"
          type="default"
          onClick={onPrevious}
          htmlType="button"
          loading={loading}
        >
          Previous
        </Button>
      )}
      {currentStep < stepsSize - 1 && (
        <Button
          style={{ marginLeft: "auto", width: 100 }}
          size="large"
          onClick={onNext}
          type="primary"
          htmlType="button"
          loading={loading}
        >
          Next
        </Button>
      )}

      {currentStep + 1 === stepsSize && (
        <Button
          className="fullwidth"
          size="large"
          type="primary"
          htmlType="submit"
          loading={loading}
        >
          Create Account
        </Button>
      )}
    </div>
  );
};

export default StepActions;
