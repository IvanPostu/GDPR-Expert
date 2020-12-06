import { CreateDataProcessingActivityRequestDataType } from '@/app/webApi/dataProcessingActivity/createDataProcessingActivity'

export type ProcessingPersonalDataActivity = CreateDataProcessingActivityRequestDataType

export enum DataProcessingStatus {
  WAIT = 'În așteptare',
  IN_PROGRESS = 'În process',
  FINALIZED = 'Finalizat',
}
