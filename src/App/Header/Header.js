import React from 'react'

const props = {
	today: '2019/04/01',
	year: 2019,
	month: {
		title: 'April',
		number: '4',
	},
}

export const Header = () => (
	<header>
		<button>Hamburger</button>
		<button>
			<a href={`/${props.today}`}>Today</a>
		</button>
		<button>
			<a href="last_month">&lt;</a>
		</button>
		<button>
			<a href="next_month">&gt;</a>
		</button>
		<h2>
			{props.month.title} {props.year}
		</h2>
	</header>
)
