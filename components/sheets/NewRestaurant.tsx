import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "../ui/sheet";
import NewRestaurantForm from "../forms/NewRestaurant";

const NewRestaurantSheet = () => {
  return (
    <Sheet>
      <SheetTrigger className="bg-primary text-background p-2 rounded hover:bg-primary/80 transition">
        Novo Restaurante
      </SheetTrigger>

      <SheetContent
        className="flex flex-col items-center justify-end gap-2 w-full h-full "
        side="bottom"
      >
        <SheetHeader>Novo Restaurante</SheetHeader>

        <SheetDescription className="px-5 w-full max-w-[500px] overflow-y-auto h-[85svh]">
          <NewRestaurantForm />
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default NewRestaurantSheet;
