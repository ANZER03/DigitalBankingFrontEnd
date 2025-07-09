export interface AccountDetails {
  type:        string;
  id:          string;
  balance:     number;
  createdAt:   Date;
  status:      null;
  customerDTO: CustomerDTO;
  overDraft:   number;
}

export interface CustomerDTO {
  id:    number;
  name:  string;
  email: string;
}

export interface AccountOperationDTO {
  id:            number;
  operationDate: Date;
  amount:        number;
  operationType: string;
  description:   string;
}
