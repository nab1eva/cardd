import React from "react";
import { Button, Card } from "react-bootstrap";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

const ExpenseCard = ({
  price,
  category,
  description,
  selectExpense,
  editExpense,
  id,
  date,
  time,
}) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between">
          <span>{price} UZS</span>
          <span>
            {date}, {time}
          </span>
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{category}</Card.Subtitle>
        <Card.Text>{description}</Card.Text>
        <div className="btns d-flex justify-content-end gap-2">
          <Button variant="primary" onClick={() => editExpense(id)}>
            <AiOutlineDelete /> Edit
          </Button>
          <Button variant="danger" onClick={() => selectExpense(id)}>
            <AiOutlineEdit /> Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ExpenseCard;
