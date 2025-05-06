import { z } from 'zod';

const AddressSchema = z.object({
  city: z.string().optional(),
  town: z.string().optional(),
  village: z.string().optional(),
  district: z.string().optional(),
  state: z.string().optional()
});

export const OpenstreetmapSchema = z.object({
  address: AddressSchema,
  display_name: z.string()
});

export const OpenstreetmapArraySchema = z.array(OpenstreetmapSchema).transform((items) => {
  return items.map((item) => ({
    display_name: [item.address.city || item.address.town || item.address.village, item.address.district, item.address.state]
      .filter(Boolean)
      .join(', '),
    address: item.address
  }));
});

export type OpenstreetmapArray = z.infer<typeof OpenstreetmapArraySchema>;

export const Department = z.object({
  Description: z.string()
});

export const NovaPoshtaSchema = z.object({
  data: z.array(Department),
  errors: z.array(z.string()),
  success: z.boolean()
});

export type NovaPoshta = z.infer<typeof NovaPoshtaSchema>;
