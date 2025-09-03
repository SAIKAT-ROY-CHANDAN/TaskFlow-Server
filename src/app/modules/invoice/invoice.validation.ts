import { InvoiceType, PaymentMethod } from '@prisma/client';
import z from 'zod';

const createInvoiceValidation = z.object({
  body: z.object({
    type: z.enum(
      [InvoiceType.MAINTENANCE, InvoiceType.NORMAL, InvoiceType.UPGRADE],
      { required_error: 'Type is required' },
    ),
    clientId: z.string().uuid({ message: 'Invalid client ID' }),
    projectId: z.string().uuid({ message: 'Invalid project ID' }),
    issueDate: z.string({ required_error: 'Issue date is required' }),
    dueDate: z.string({ required_error: 'Due date is required' }),
    subtotal: z
      .number()
      .min(0, { message: 'Subtotal must be non-negative' })
      .optional()
      .default(0),
    tax: z
      .number()
      .min(0, { message: 'Tax must be non-negative' })
      .optional()
      .default(0),
    discount: z
      .number()
      .min(0, { message: 'Discount must be non-negative' })
      .optional()
      .default(0),
    total: z
      .number()
      .min(0, { message: 'Total must be non-negative' })
      .optional()
      .default(0),
    amountPaid: z
      .number()
      .min(0, { message: 'Amount paid must be non-negative' })
      .optional()
      .default(0),
    balanceDue: z
      .number()
      .min(0, { message: 'Balance due must be non-negative' })
      .optional()
      .default(0),
    notes: z.string().optional(),
    bankName: z.string({ required_error: 'Bank name is required' }),
    accountName: z.string({ required_error: 'Account name is required' }),
    accountNumber: z.string({ required_error: 'Account number is required' }),
    branch: z.string().optional(),
    paymentMethod: z.enum(
      [
        PaymentMethod.CARD,
        PaymentMethod.BANK_TRANSFER,
        PaymentMethod.BKASH,
        PaymentMethod.NAGAD,
        PaymentMethod.CASH,
      ],
      { required_error: 'Payment method is required' },
    ),
    items: z.array(
      z.object({
        title: z.string({ required_error: 'Item title is required' }),
        total: z
          .number()
          .min(0, { message: 'Item total must be non-negative' }),
      }),
    ),
  }),
});

export const InvoiceValidation = {
  create: createInvoiceValidation,
};
