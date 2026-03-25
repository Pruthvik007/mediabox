"use client";

import { useContext } from "react";
import { ModalContext } from "@/context/modal-context";

export function useModal() {
  return useContext(ModalContext);
}
