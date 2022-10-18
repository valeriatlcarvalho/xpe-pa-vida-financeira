import { CreditCardPage } from "../components/pages/CreditCardPage";
import { HomePage } from "../components/pages/HomePage";
import { SubscriptionPage } from "../components/pages/SubscriptionPage";

const APP_ROUTES = [
  {
    path: "/",
    element: <HomePage />,
    routeName: 'home',
    title: 'Visão Geral'
  },
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
