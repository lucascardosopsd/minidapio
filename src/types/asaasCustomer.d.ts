export interface AsaasCustomerObj {
  object: string;
  id: string;
  dateCreated: string;
  name: string;
  email: string;
  phone: string;
  mobilePhone: string;
  address: string;
  addressNumber: string;
  complement: string;
  province: string;
  postalCode: string;
  cpfCnpj: string;
  personType: string;
  deleted: boolean;
  additionalEmails: string;
  externalReference: string;
  notificationDisabled: boolean;
  city: number;
  cityName: string;
  state: string;
  country: string;
  observations: string;
}

export interface AsaasCustomerResProps {
  customer: AsaasCustomerObj;
}
