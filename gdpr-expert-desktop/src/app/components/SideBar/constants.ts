import { routeNames } from '@/app/routes/routeNames'
import { ReactElement, createElement } from 'react'
import { IoIosInformationCircleOutline, IoMdClipboard, IoIosBook } from 'react-icons/io'

export const BAR_SIZE = 440

type RoutesType = Array<{ title: string; routeName: string; icon: ReactElement }>
export const SIDE_BAR_ROUTES: RoutesType = [
  {
    title: 'Organizații',
    icon: createElement(IoMdClipboard, {}, null),
    routeName: routeNames.OrganisationsPageRoute,
  },
  {
    title: 'Cereri de solicitare a datelor',
    icon: createElement(IoIosInformationCircleOutline, {}, null),
    routeName: routeNames.RequestsForPersonalInfoPageRoute,
  },
  {
    title: 'Evaluare severității compromiterii datelor cu caracter personal',
    icon: createElement(IoIosBook, {}, null),
    routeName: routeNames.RequestsForPersonalInfoPageRoute,
  },
]
