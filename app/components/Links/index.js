import React from 'react';
import { Link } from 'react-router-dom';

export const DashboardLink = props => (
  <Link style={{ textDecoration: 'none' }} to="/dashboard" {...props} />
);

export const SigninLink = props => (
  <Link style={{ textDecoration: 'none' }} to="/signin" {...props} />
);

export const SignupLink = props => (
  <Link style={{ textDecoration: 'none' }} to="/signup" {...props} />
);

export const ProfileLink = props => (
  <Link style={{ textDecoration: 'none' }} to="/profile" {...props} />
);
