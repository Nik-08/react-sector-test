import { FC } from 'react';
import { Navigate } from 'react-router-dom';

export const NotFoundPage: FC = () => <Navigate to="/" />;
