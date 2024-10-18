import { AuthResolver } from '../auth/auth.resolver';
import { OrderResolver } from '../modules/order/order.resolver';
import { QuestionResolver } from '../modules/question/question.resolver';

export const resolvers = [
  AuthResolver,
  OrderResolver,
  QuestionResolver,
];
