import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

const Dialog = props => (
  <Modal show={props.show} onHide={props.onHide} className="dialog-modal">
    <Modal.Header closeButton>
      <Modal.Title>Title</Modal.Title>
    </Modal.Header>
    <Modal.Body>Woah</Modal.Body>
    <Modal.Footer>Footer</Modal.Footer>
  </Modal>
);

export default Dialog;
