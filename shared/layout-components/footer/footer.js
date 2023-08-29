'use client';
import React from 'react';
import {Col, Row} from 'react-bootstrap';
import Link from 'next/link';

const Footer = ({linkColor}) => {
  return (
    <Row className="align-items-center">
      <Col md={6} sm={12} className="">
        Copyright © 2023{' '}
        <Link href="#!" style={{color: linkColor || '#e74c3c'}}>
          Tip Your Teacher
        </Link>
        . Developed by{' '}
        <Link href="#!" style={{color: linkColor || '#e74c3c'}}>
          {' '}
          Desol Int.{' '}
        </Link>{' '}
        All rights reserved.
      </Col>
      <Col md={6} sm={12} className="text-end">
        <Link
          href="/terms-and-conditions"
          style={{color: linkColor || '#e74c3c'}}
        >
          Terms & Conditions
        </Link>
        &nbsp;&nbsp;|&nbsp;&nbsp;
        <Link href="/privacy-policy" style={{color: linkColor || '#e74c3c'}}>
          Privacy Policy
        </Link>
      </Col>
    </Row>
  );
};

export default Footer;
