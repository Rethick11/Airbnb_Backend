
export interface EmailDTO {
  to: string;
  from?: string;
  body?: string;
  templateId?: number;
  attributes?: Record<string, string>;
}
