import type { Action } from '../types/action';

class Queue {
	elements = [];
	length = this.elements.length;

	constructor() {
		this.elements = [];
	}

	enqueue(element: unknown): void {
		this.elements.push(element);
	}

	dequeue(): Action {
		return this.elements.shift();
	}

	isEmpty(): boolean {
		return this.elements.length === 0;
	}

	peek(): unknown {
		return !this.isEmpty() ? this.elements[0] : undefined;
	}
}

export { Queue };
