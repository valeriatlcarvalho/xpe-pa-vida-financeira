import { CreditCardPage } from "../components/pages/CreditCardPage";
import { SubscriptionPage } from "../components/pages/SubscriptionPage";

const APP_ROUTES = [
  {
    path: "/credit-card",
    element: <CreditCardPage />,
    routeName: 'credit-card',
    title: 'Cartões de crédito'
  },
  {
    path: "/subscription",
    element: <SubscriptionPage />,
    routeName: 'subscription',
    title: 'Assinaturas'
  },
];

export { APP_ROUTES };
