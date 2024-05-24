export interface getCostumerProps {
  object: {};
  hasMore: boolean;
  totalCount: number;
  limit: number;
  offset: number;
  data: [
    {
      object: {};
      id: string;
      dateCreated: string;
      name: string;
      email: string | null;
      company: string | null;
      phone: string | null;
      mobilePhone: string | null;
      address: string | null;
      addressNumber: string | null;
      complement: string | null;
      province: string | null;
      postalCode: string | null;
      cpfCnpj: number;
      personType: string;
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
  ];
}
