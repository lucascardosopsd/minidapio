"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { FullRestaurantProps } from "@/types/restaurant";

interface NoteModalProps {
  restaurant: FullRestaurantProps;
}

const NoteModal = ({ restaurant }: NoteModalProps) => {
  const [open, onOpen] = useState(true);

  const handleFirstClose = () => {
    localStorage.setItem("hasNoted", "true");
  };

  const checkFirstClose = () => {
    if (localStorage.getItem("hasNoted") == "true") {
      onOpen(false);
    }
  };

  useEffect(() => {
    checkFirstClose();
  }, []);

  return (
    <Dialog
      onOpenChange={(state) => {
        onOpen(state);
        handleFirstClose();
      }}
      open={open}
    >
      <DialogContent>
        <DialogHeader>
          <p
            className="text-2xl text-center"
            style={{ color: restaurant.color }}
          >
            Atenção
          </p>
        </DialogHeader>
        <p className="max-w-[50svw] text-center">{restaurant.note}</p>
      </DialogContent>
    </Dialog>
  );
};

export default NoteModal;
