import React from "react";
import { Form, Input, Button } from "antd";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  const onFinish = (formData) => {
    handleSubmit(formData.name);
  };

  return (
    <Form onFinish={onFinish} initialValues={{ name: value }}>
      <Form.Item
        name="name"
        rules={[{ required: true, message: "Please enter a category!" }]}
      >
        <Input
          placeholder="Enter new category"
          onChange={(e) => setValue(e.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CategoryForm;
