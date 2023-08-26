import { Form, Select } from "antd";
import React from "react";
import COUNTRIES from "../../constants/countries";

const CountriesSelect = ({ label }) => {
  const options = COUNTRIES.map((country) => ({
    label: country,
    value: country.toLowerCase(),
  }));
  return (
    <Form.Item name="country" label={label}>
      <Select
        size="large"
        allowClear={false}
        showSearch
        placeholder="Country"
        optionFilterProp="children"
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        options={options}
      />
    </Form.Item>
  );
};

export default CountriesSelect;
