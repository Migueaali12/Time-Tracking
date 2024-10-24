import { ReactNode } from "react";

export interface LayoutProps {
  children: ReactNode
}

export enum HeaderType {
  HOME,
  USER,
  ADMIN,
}
