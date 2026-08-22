import type { ResourceDef } from '../types';
import { productsResource } from './products';
import { servicesResource } from './services';
import { digitalResource } from './digital';
import { ordersResource } from './orders';

/** Sidebar order. */
export const RESOURCES: ResourceDef[] = [
  productsResource,
  servicesResource,
  digitalResource,
  ordersResource,
];

export function findResource(slug: string | undefined): ResourceDef | undefined {
  return RESOURCES.find((r) => r.slug === slug);
}

export { productsResource, servicesResource, digitalResource, ordersResource };
