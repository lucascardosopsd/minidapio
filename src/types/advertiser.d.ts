export interface AdvertiserAsaasProps {
  object: string;
  id: string;
  dateCreated: string;
  name: string;
  phone: string;
  cpfCnpj: string;
  personType: "FISICA" | "JURIDICA";
  deleted: boolean;
  additionalEmails: string | null;
  externalReference: string | null;
  notificationDisabled: boolean;
  observations: string | null;
  municipalInscription: string | null;
  stateInscription: string | null;
  canDelete: boolean;
  cannotBeDeletedReason: string | null;
  canEdit: boolean;
  cannotEditReason: string | null;
  city: string | null;
  cityName: string | null;
  state: string | null;
  country: string;
}
