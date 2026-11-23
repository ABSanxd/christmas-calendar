/**
 * Panel de ajustes: sonido, recordatorios, movimiento y reinicio del progreso.
 */

import { createElement } from '../../utils/domUtils.js';
import { createModal } from './Modal.js';
import { CONFIG } from '../../data/configuration.js';

/**
 * Crea el modal de ajustes.
 *
 * @param {object} options
 * @param {object} options.settings Estado actual de las preferencias.
 * @param {(key: string, value: boolean|string) => void} options.onPreferenceChange
 * @param {() => void} options.onResetProgress
 * @param {() => void} options.onClose
 * @returns {{modal: object}}
 */
export function createSettingsPanel(options) {
  const { settings, onPreferenceChange, onResetProgress, onClose } = options;

  const modal = createModal({
    title: 'Ajustes',
    subtitle: 'Todo se guarda solo en este navegador',
    size: 'regular',
    onClose,
  });

  const container = createElement('div', { class: 'settings' });

  // --- Sonido ---
  const soundRow = createElement('div', { class: 'settings__row' });
  soundRow.innerHTML = `
    <div class="settings__text">
      <p class="settings__label">Sonido</p>
      <p class="settings__hint">Campanillas suaves al abrir las casillas y la corona.</p>
    </div>`;
  const soundSwitch = createElement('button', {
    type: 'button',
    class: 'switch',
    role: 'switch',
    'aria-checked': String(settings.sound !== false),
    'aria-label': 'Activar o desactivar el sonido',
  });
  soundSwitch.innerHTML = '<span class="switch__knob"></span>';
  soundSwitch.addEventListener('click', () => {
    const next = soundSwitch.getAttribute('aria-checked') !== 'true';
    soundSwitch.setAttribute('aria-checked', String(next));
    onPreferenceChange?.('sound', next);
  });
  soundRow.appendChild(soundSwitch);
  container.appendChild(soundRow);

  // --- Recordatorios ---
  const notificationRow = createElement('div', { class: 'settings__row' });
  notificationRow.innerHTML = `
    <div class="settings__text">
      <p class="settings__label">Recordatorios</p>
      <p class="settings__hint">
        Avisos del navegador mientras la página está abierta. GitHub Pages no
        puede enviar notificaciones con el navegador cerrado.
      </p>
    </div>`;
  const notificationSwitch = createElement('button', {
    type: 'button',
    class: 'switch',
    role: 'switch',
    'aria-checked': String(Boolean(settings.notifications)),
    'aria-label': 'Activar o desactivar los recordatorios',
  });
  notificationSwitch.innerHTML = '<span class="switch__knob"></span>';
  notificationSwitch.addEventListener('click', () => {
    const next = notificationSwitch.getAttribute('aria-checked') !== 'true';
    notificationSwitch.setAttribute('aria-checked', String(next));
    onPreferenceChange?.('notifications', next);
  });
  notificationRow.appendChild(notificationSwitch);
  container.appendChild(notificationRow);

  // --- Movimiento ---
  const motionRow = createElement('div', { class: 'settings__row settings__row--column' });
  motionRow.innerHTML = `
    <div class="settings__text">
      <p class="settings__label">Movimiento</p>
      <p class="settings__hint">Elige si prefieres menos animaciones.</p>
    </div>`;
  const motionSelect = createElement('select', { class: 'select', 'aria-label': 'Preferencia de movimiento' });
  [
    ['system', 'Según el sistema'],
    ['full', 'Animaciones completas'],
    ['reduced', 'Movimiento reducido'],
  ].forEach(([value, label]) => {
    const option = createElement('option', { value });
    option.textContent = label;
    motionSelect.appendChild(option);
  });
  motionSelect.value = settings.reducedMotion ?? 'system';
  motionSelect.addEventListener('change', () => {
    onPreferenceChange?.('reducedMotion', motionSelect.value);
  });
  motionRow.appendChild(motionSelect);
  container.appendChild(motionRow);

  // --- Datos ---
  const dataNote = createElement('div', { class: 'settings__note' });
  dataNote.innerHTML = `
    <p class="settings__label">Sobre tu progreso</p>
    <p>
      El progreso vive en <code>${CONFIG.storageKey}</code> dentro de
      <code>localStorage</code>. No se sincroniza entre dispositivos ni entre
      navegadores, y no hay cuentas ni registros.
    </p>`;
  container.appendChild(dataNote);

  // --- Reiniciar ---
  const resetButton = createElement('button', { type: 'button', class: 'button button--danger' });
  resetButton.textContent = 'Reiniciar mi progreso';
  const resetNote = createElement('p', { class: 'settings__hint' });
  resetNote.textContent =
    'Se borrarán las casillas descubiertas y las actividades completadas. Esta acción no se puede deshacer.';
  const resetContainer = createElement('div', { class: 'settings__reset' });
  resetContainer.appendChild(resetButton);
  resetContainer.appendChild(resetNote);
  container.appendChild(resetContainer);

  resetButton.addEventListener('click', () => {
    if (resetButton.dataset.confirming === 'true') {
      resetButton.dataset.confirming = 'false';
      resetButton.textContent = 'Reiniciar mi progreso';
      resetNote.textContent =
        'Se borrarán las casillas descubiertas y las actividades completadas. Esta acción no se puede deshacer.';
      onResetProgress?.();
      return;
    }
    resetButton.dataset.confirming = 'true';
    resetButton.textContent = '¿Seguro? Pulsa otra vez para confirmar';
    resetNote.textContent = 'Confirma pulsando de nuevo el botón.';
  });

  modal.content.appendChild(container);
  return { modal };
}

export default createSettingsPanel;
