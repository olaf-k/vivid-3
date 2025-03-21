
import { html, ref, slotted, when } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import type { Tabs } from './tabs.js';

const getClasses = ({
	orientation
}: Tabs) => classNames(
	'base',
	[`orientation-${orientation}`, Boolean(orientation)],
);

/**
 * The template for the {@link @vonage/vivid#(Tabs:class)} component.
 *
 * @param options
 * @public
 */
export function TabsTemplate<T extends Tabs>() {
	return html<T>`
	<template role="tablist">
		<div class="${getClasses}">
			<div class="tablist" ${ref('tablist')}>
				<slot name="tab" ${slotted('tabs')}></slot>
				${when(x => x.showActiveIndicator, html<T>`
					<div ${ref('activeIndicatorRef')} class="active-indicator"></div>
				`)}
			</div>
			<div class="tabpanel">
				<slot name="tabpanel" ${slotted('tabpanels')}></slot>
			</div>
		</div>
	</template>
    `;
}
