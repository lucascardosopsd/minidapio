"use client";
import { ReactNode, useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "../../ui/dialog";
import { Button } from "@/components/ui/button";
import { SubscriptionWithPlanProps } from "@/types/plan";
import { FullRestaurantNestedProps } from "@/types/restaurant";
import { planLimits } from "@/constants/planLimits";
import Step2Restaurants from "./steps/Step2Restaurants";
import Step3Categories from "./steps/Step3Categories";
import Step4Items from "./steps/Step4Items";
import Step5Complete from "./steps/Step5Complete";
import Step1Notice from "./steps/Step1Notice";

interface ExcludeIdsStateProps {
  restaurants: string[];
  categories: string[];
  items: string[];
}

interface DowngradeModalProps {
  fullNestedRestaurants: FullRestaurantNestedProps[];
  subscriptions: SubscriptionWithPlanProps[];
}

const DowngradeModal = ({
  fullNestedRestaurants,
  subscriptions,
}: DowngradeModalProps) => {
  // Aparece quando o plano anterior é maior que o atual e existe limites ultrapassados. Elee é do tipo multi step

  const [steps] = useState<ReactNode[]>([<Step1Notice />, <Step5Complete />]);
  const [step, setStep] = useState(0);
  const [open, setOpen] = useState(false);
  const [excludeIds, setExcludeIds] = useState<ExcludeIdsStateProps>({
    restaurants: [],
    categories: [],
    items: [],
  });

  const limits = planLimits[subscriptions[0].Plan.alias];

  // Flat all items and all categories to check limits
  const allCategories = fullNestedRestaurants.flatMap(
    (restaurant) => restaurant?.categories
  );

  if (fullNestedRestaurants.length > limits.restaurants && steps.length < 3) {
    steps.splice(
      steps.length / 2,
      0,
      <Step2Restaurants
        restaurants={fullNestedRestaurants}
        limits={limits}
        callback={(ids) =>
          setExcludeIds((prev) => ({
            ...prev,
            restaurants: ids,
          }))
        }
      />
    );
  }

  const allItems = allCategories.flatMap((category) => category?.items);

  allCategories.length > limits.items && steps.push(<Step3Categories />);

  allItems.length > limits.items && steps.push(<Step4Items />);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  useEffect(() => {
    // if adapt is needed open modal
    setOpen(steps.length > 1);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent closeDisabled>
        <DialogHeader>
          <DialogDescription className="flex flex-col">
            {steps[step]}

            <div className="flex gap-2 ml-auto">
              {step > 0 && (
                <Button variant="outline" onClick={handlePrevStep}>
                  Anterior
                </Button>
              )}

              {step !== steps.length - 1 && (
                <Button onClick={handleNextStep}>Próximo</Button>
              )}

              {step == steps.length - 1 && (
                <DialogClose asChild>
                  <Button type="button">Concluir</Button>
                </DialogClose>
              )}
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DowngradeModal;
