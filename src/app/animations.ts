import {
    trigger,
    animate,
    transition,
    style,
    query,
    animateChild,
    group,
    state,
    stagger
  } from '@angular/animations';

export const slideInLeft =
trigger('slideInLeft', [
    transition('* <=> *', [
        style({
            opacity: 0,
            transform: 'translate3d(-100%, 0, 0)'
        }),
        animate('1s 200ms ease-in')
    ])
]
);

export const staggerAnimation =
trigger('listStagger', [
    transition('* <=> *', [
      query(
        ':enter',
        [
          style({ opacity: 0, transform: 'translateY(-15px)' }),
          stagger(
            '50ms',
            animate(
              '550ms ease-out',
              style({ opacity: 1, transform: 'translateY(0px)' })
            )
          )
        ],
        { optional: true }
      ),
      query(':leave', animate('50ms', style({ opacity: 0 })), {
        optional: true
      })
    ])
  ]);
