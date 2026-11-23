/**
 * Punto de entrada de la aplicación.
 *
 * Coordina el arranque de los controladores y mantiene el estado global
 * sincronizado.
 */

import { initProgressController } from './modules/progress/progressController.js';
import { initCalendarController } from './modules/calendar/calendarController.js';

/**
 * Arranca la aplicación.
 */
export function bootstrap() {
  initProgressController();
  initCalendarController();
}

export default bootstrap;
