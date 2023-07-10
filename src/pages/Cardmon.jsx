import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Form,
  InputGroup,
  Accordion,
  Badge,
} from "react-bootstrap";
import "./Cardmon.scss";
import {
  Debtscategories,
  categories as categoriesData,
} from "../data/categories.js";
import Footer from "../components/Footer";
import ExpenseCard from "../components/ExpenseCard";
import { getCurrentDate, getCurrentMonth, getCurrentTime } from "../utils/date";
import { DEBTS, EXPENSES } from "../const";
import { v4 as uuidv4 } from "uuid";
import useModal from "../hooks/useModal";
import { MdPermContactCalendar } from "react-icons/md";
import DebtsCard from "../components/DebtsCard";

const initialExpense = {
  price: "",
  category: "1",
  description: "",
  date: getCurrentDate(),
  time: getCurrentTime(),
};
const initialDebts = {
  price: "",
  category: "2",
  debtsName: "",
  telNumber: "",
  description: "",
  dueDate: "",
  date: getCurrentDate(),
  time: getCurrentTime(),
};

const Cardmon = () => {
  const [active, setActive] = useState(1);
  const [show, handleShow, handleClose] = useModal();
  const [confirmShow, handleConfirmShow, handleConfirmClose] = useModal();
  const [categories, setCategories] = useState([]);
  const [expenses, setExpenses] = useState(
    JSON.parse(localStorage.getItem(EXPENSES)) || []
  );
  const [debts, setDebts] = useState(
    JSON.parse(localStorage.getItem(DEBTS)) || []
  );
  const [month, setMonth] = useState(getCurrentMonth());
  const [expense, setExpense] = useState(initialExpense);
  const [debt, setDebt] = useState(initialDebts);
  const [selected, setSelected] = useState(null);
  useEffect(() => {
    setCategories(categoriesData);
  }, []);
  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };
  const handleDebtsChange = (e) => {
    setDebt({ ...debt, [e.target.name]: e.target.value });
  };
  const addExpense = (e) => {
    e.preventDefault();
    let newExpenses;
    if (selected) {
      newExpenses = expenses.map((ex) => {
        if (ex.id === selected) {
          return expense;
        } else {
          return ex;
        }
      });
    } else {
      newExpenses = [
        ...expenses,
        {
          id: uuidv4(),
          ...expense,
        },
      ];
    }
    handleClose();
    setExpenses(newExpenses);
    localStorage.setItem(EXPENSES, JSON.stringify(newExpenses));
  };
  const addDebts = (e) => {
    e.preventDefault();
    let newExpenses;
    if (selected) {
      newExpenses = debts.map((ex) => {
        if (ex.id === selected) {
          return debt;
        } else {
          return ex;
        }
      });
    } else {
      newExpenses = [
        ...debts,
        {
          id: uuidv4(),
          ...debt,
        },
      ];
    }
    handleClose();
    setDebts(newExpenses);
    localStorage.setItem(DEBTS, JSON.stringify(newExpenses));
  };
  const selectExpense = (id) => {
    handleConfirmShow();
    setSelected(id);
  };
  const selectDebts = (id) => {
    handleConfirmShow();
    setSelected(id);
  };
  const deleteExpense = () => {
    let newExpenses = expenses.filter((ex) => ex.id !== selected);
    handleConfirmClose();
    setExpenses(newExpenses);
    localStorage.setItem(EXPENSES, JSON.stringify(newExpenses));
  };
  const deleteDebts = () => {
    let newExpenses = debts.filter((ex) => ex.id !== selected);
    handleConfirmClose();
    setDebts(newExpenses);
    localStorage.setItem(DEBTS, JSON.stringify(newExpenses));
  };
  const editExpense = (id) => {
    handleShow();
    setSelected(id);
    let findedExpense = expenses.find((ex) => ex.id === id);
    setExpense(findedExpense);
  };
  const editDebts = (id) => {
    handleShow();
    setSelected(id);
    let findedExpense = debts.find((ex) => ex.id === id);
    setDebt(findedExpense);
  };
  const handleMonth = (e) => {
    setMonth(e.target.value);
  };
  const openModal = () => {
    handleShow();
    setSelected(null);
    setExpense(initialExpense);
  };
  const handleTab = (id) => {
    setActive(id);
  };
  const accordionItem = (item, i) => {
    const filteredExpenses = expenses.filter(
      (ex) => ex.category === item.id && ex.date.slice(0, -3) === month
    );
    return (
      <Accordion.Item key={item.id} eventKey={i}>
        <Accordion.Header as="div" className="d-flex justify-content-between">
          <h4>
            {item.name} <Badge bg="primary">{filteredExpenses.length}</Badge>
          </h4>
          <span>
            {filteredExpenses.reduce((acc, ex) => acc + +ex.price, 0)} UZS
          </span>
        </Accordion.Header>
        <Accordion.Body>
          {filteredExpenses.map((item) => (
            <div key={item.id} className="my-2">
              <ExpenseCard
                {...item}
                category={categories.find((c) => c.id === item.category)?.name}
                selectExpense={selectExpense}
                editExpense={editExpense}
              />
            </div>
          ))}
        </Accordion.Body>
      </Accordion.Item>
    );
  };
  const accordionDebtItem = (item, i) => {
    const filteredDebts = debts.filter(
      (ex) => ex.category === item.id && ex.date.slice(0, -3) === month
    );
    return (
      <Accordion.Item key={item.id} eventKey={i}>
        <Accordion.Header as="div" className="d-flex justify-content-between">
          <h4>
            {item.name} <Badge bg="primary">{filteredDebts.length}</Badge>
          </h4>
          <span>
            {filteredDebts.reduce((acc, ex) => acc + +ex.price, 0)} UZS
          </span>
        </Accordion.Header>
        <Accordion.Body>
          {filteredDebts.map((item) => (
            <div key={item.id} className="my-2">
              <DebtsCard
                {...item}
                category={categories.find((c) => c.id === item.category)?.name}
                selectDebts={selectDebts}
                editDebts={editDebts}
              />
            </div>
          ))}
        </Accordion.Body>
      </Accordion.Item>
    );
  };
  console.log(debt.telNumber);
  return (
    <div className="cardmon-layout vh-100 bg-light m-auto">
      <div className="cardmon-body p-3">
        <div className="mb-3 cardmon_top-date">
          <Form.Control value={month} type="month" onChange={handleMonth} />
        </div>
        {active === 1 ? (
          <Accordion defaultActiveKey="0">
            {categories
              .filter((c) =>
                expenses.find(
                  (ex) => ex.category === c.id && ex.date.slice(0, -3) === month
                )
              )
              .map((item, i) => accordionItem(item, i))}
          </Accordion>
        ) : active === 2 ? (
          <Accordion defaultActiveKey="0">
            {Debtscategories.filter((c) =>
              debts.find(
                (ex) => ex.category === c.id && ex.date.slice(0, -3) === month
              )
            ).map((item, i) => accordionDebtItem(item, i))}
          </Accordion>
        ) : (
          ""
        )}
      </div>
      <Modal show={show} onHide={handleClose}>
        {active === 1 ? (
          <Form onSubmit={addExpense}>
            <Modal.Header closeButton>
              <Modal.Title>Operations</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Label>Enter amount</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text>UZS</InputGroup.Text>
                  <Form.Control
                    onChange={handleChange}
                    name="price"
                    value={expense.price}
                    placeholder="100 000"
                    aria-label=""
                  />
                  <InputGroup.Text>.00</InputGroup.Text>
                </InputGroup>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Choose category</Form.Label>
                <Form.Select
                  value={expense.category}
                  onChange={handleChange}
                  name="category"
                  placeholder="category"
                >
                  {categories.map((item) => (
                    <option value={item.id}>{item.name}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Notes</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  name="description"
                  placeholder="note..."
                  value={expense.description}
                  as="textarea"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Date and time</Form.Label>
                <div className="d-flex justify-content-between gap-4">
                  <Form.Control
                    onChange={handleChange}
                    name="date"
                    value={expense.date}
                    type="date"
                  />
                  <Form.Control
                    onChange={handleChange}
                    name="time"
                    value={expense.time}
                    type="time"
                  />
                </div>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button type="submit" variant="primary">
                {selected ? "Save" : "Add"}
              </Button>
            </Modal.Footer>
          </Form>
        ) : active === 2 ? (
          <Form onSubmit={addDebts}>
            <Modal.Header closeButton>
              <Modal.Title>Debts</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Label>Enter Amount</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text>UZS</InputGroup.Text>
                  <Form.Control
                    onChange={handleDebtsChange}
                    name="price"
                    value={debt.price}
                    placeholder="100 000"
                    aria-label=""
                  />
                  <InputGroup.Text>.00</InputGroup.Text>
                </InputGroup>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Choose category</Form.Label>
                <Form.Select
                  value={debt.category}
                  onChange={handleDebtsChange}
                  name="category"
                  placeholder="category"
                >
                  {Debtscategories.map((item) => (
                    <option value={item.id}>{item.name}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    onChange={handleDebtsChange}
                    name="debtsName"
                    value={debt.debtsName}
                    placeholder="Name"
                    aria-label=""
                  />
                  <Button>
                    <MdPermContactCalendar />
                  </Button>
                </InputGroup>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    onChange={handleDebtsChange}
                    name="telNumber"
                    value={debt.telNumber}
                    placeholder="+998"
                    type="tel"
                    aria-label=""
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Notes</Form.Label>
                <Form.Control
                  onChange={handleDebtsChange}
                  name="description"
                  placeholder="Note"
                  value={debt.description}
                  as="textarea"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Deadline</Form.Label>
                <div className="d-flex justify-content-between">
                  <Form.Control
                    onChange={handleDebtsChange}
                    name="dueDate"
                    placeholder="Due date"
                    value={debt.dueDate}
                    type="date"
                  />
                </div>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Date and Time</Form.Label>
                <div className="d-flex justify-content-between gap-4">
                  <Form.Control
                    onChange={handleDebtsChange}
                    name="date"
                    value={debt.date}
                    type="date"
                  />
                  <Form.Control
                    onChange={handleDebtsChange}
                    name="time"
                    value={debt.time}
                    type="time"
                  />
                </div>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button type="submit" variant="primary">
                {selected ? "Save" : "Add"}
              </Button>
            </Modal.Footer>
          </Form>
        ) : (
          ""
        )}
      </Modal>
      {active === 1 ? (
        <Modal show={confirmShow} onHide={handleConfirmClose}>
          <Modal.Header closeButton>
            <Modal.Title>Do you want to delete ?</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleConfirmClose}>
              No
            </Button>
            <Button variant="primary" onClick={deleteExpense}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      ) : active === 2 ? (
        <Modal show={confirmShow} onHide={handleConfirmClose}>
          <Modal.Header closeButton>
            <Modal.Title>Do you want to delete ?</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleConfirmClose}>
              No
            </Button>
            <Button variant="primary" onClick={deleteDebts}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      ) : (
        ""
      )}
      <Footer handleShow={openModal} handleTab={handleTab} />
    </div>
  );
};

export default Cardmon;
