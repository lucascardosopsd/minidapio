export type WithProperty<T, K extends keyof any, V> = T & { [P in K]: V };

export type ExposedToggleModalProps = {
  toggleModal: () => void;
};
