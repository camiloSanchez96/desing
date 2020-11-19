import { trigger, style, transition, animate , state} from '@angular/animations';

export const CONSTANTS = {
    draggableView : 'timeGridWeek',
    hourFormat: 'hh:mm A',
    dateFormat: 'YYYY-MM-DD h:mm a',
    dateFormatFull: 'YYYY-MM-DD HH:mm',
    datetimeFormat: 'YYYY-MM-DD h:mm a',
    slotDuration: '00:30:00',
    calendarDefaultView: 'dayGridMonth',
    breaksDuration: '00:15:00',
    defaultDuration: '00:60:00',
    shiftDuration: '08:00:00',
    shiftId: 8,
    breaksId: '1',
    lunchId: 5,
    lunchColor: '#00a65a',
    dayOfftype: 10,
    dayOffColor: '#C0C0C0',
    base64ImageCheck : 'data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBoZWlnaHQ9IjY0cHgiIHZpZXdCb3g9IjAgLTIxIDUxMi4wMDUzMyA1MTIiIHdpZHRoPSI2NHB4Ij48cGF0aCBkPSJtMzA2LjU4MjAzMSAzMTcuMjVjLTEyLjA3NDIxOSAxMi4wOTc2NTYtMjguMTYwMTU2IDE4Ljc1MzkwNi00NS4yNSAxOC43NTM5MDYtMTcuMDg1OTM3IDAtMzMuMTcxODc1LTYuNjU2MjUtNDUuMjQ2MDkzLTE4Ljc1MzkwNmwtOTAuNjY3OTY5LTkwLjY2NDA2MmMtMTIuMDkzNzUtMTIuMDc4MTI2LTE4Ljc1LTI4LjE2MDE1Ny0xOC43NS00NS4yNSAwLTE3LjA4OTg0NCA2LjY1NjI1LTMzLjE3MTg3NiAxOC43NS00NS4yNDYwOTQgMTIuMDc0MjE5LTEyLjA5NzY1NiAyOC4xNjAxNTYtMTguNzUzOTA2IDQ1LjI1LTE4Ljc1MzkwNiAxNy4wODU5MzcgMCAzMy4xNzE4NzUgNi42NTYyNSA0NS4yNDYwOTMgMTguNzUzOTA2bDQ1LjQxNzk2OSA0NS4zOTQ1MzEgMTI1LjM3ODkwNy0xMjUuMzc1Yy00MC45NjA5MzgtMzQuOTIxODc1LTkzLjk5NjA5NC01Ni4xMDU0Njg3NS0xNTIuMDQyOTY5LTU2LjEwNTQ2ODc1LTEyOS42MDE1NjMgMC0yMzQuNjY3OTY5IDEwNS4wNjY0MDU3NS0yMzQuNjY3OTY5IDIzNC42NjQwNjI3NSAwIDEyOS42MDE1NjIgMTA1LjA2NjQwNiAyMzQuNjY3OTY5IDIzNC42Njc5NjkgMjM0LjY2Nzk2OSAxMjkuNTk3NjU2IDAgMjM0LjY2NDA2Mi0xMDUuMDY2NDA3IDIzNC42NjQwNjItMjM0LjY2Nzk2OSAwLTI0LjI1MzkwNy0zLjY4NzUtNDcuNjM2NzE5LTEwLjUxNTYyNS02OS42NTIzNDR6bTAgMCIgZmlsbD0iIzRjYWY1MCIvPjxwYXRoIGQ9Im0yNjEuMzMyMDMxIDI5My4zMzU5MzhjLTUuNDYwOTM3IDAtMTAuOTIxODc1LTIuMDg5ODQ0LTE1LjA4MjAzMS02LjI1bC05MC42NjQwNjItOTAuNjY3OTY5Yy04LjM0Mzc1LTguMzM5ODQ0LTguMzQzNzUtMjEuODI0MjE5IDAtMzAuMTY0MDYzIDguMzM5ODQzLTguMzQzNzUgMjEuODIwMzEyLTguMzQzNzUgMzAuMTY0MDYyIDBsNzUuNTgyMDMxIDc1LjU4MjAzMiAyMTQuMjUzOTA3LTIxNC4yNWM4LjMzOTg0My04LjMzOTg0NCAyMS44MjAzMTItOC4zMzk4NDQgMzAuMTY0MDYyIDAgOC4zMzk4NDQgOC4zNDM3NSA4LjMzOTg0NCAyMS44MjQyMTggMCAzMC4xNjc5NjhsLTIyOS4zMzU5MzggMjI5LjMzMjAzMmMtNC4xNTYyNSA0LjE2MDE1Ni05LjYyMTA5MyA2LjI1LTE1LjA4MjAzMSA2LjI1em0wIDAiIGZpbGw9IiMyMTk2ZjMiLz48L3N2Zz4K',
    maxDaysBefore: 0,
    maxDaysAfter: 30,
    daysOffColor: '#C0C0C0',
    NumberPattern: '[0-9]+',
    shiftColor: '#6A3878',
    breakColor: '#508cb8',
    defaultShiftStart : {hour: 7, minutes: 0, seconds: 0},
    defaultShiftEnd: {hour: 15, minutes: 30, seconds: 0},
    digitsLength: 6,
    expirationPin: 1,
};

export const KPICOLORS = {
    primary: '#e61e5c',
    secondary: '#00d68f',
    chartPrimaryColor: '#0095ff',
};

export const ANIMATIONSLOGIN = [
    trigger('enterOutTransition', [
      state('void', style({
        transform: 'translateX(-100%)',
        opacity: 0,
      })),
      transition(':enter', [
        animate(500, style({
          transform: 'translateX(0)',
          opacity: 1,
        })),
      ]),
      state('open', style({
        transform: 'translateX(0)',
      })),
      transition(':leave', [
        animate(500, style({
          transform: 'translateX(-100%)',
          opacity: 0,
        })),
      ]),
    ],
    ),
  trigger('enterOutValidator', [
    state('void', style({
      transform: 'translateX(100%)',
      opacity: 0,
    })),
    transition(':enter', [
      animate(500, style({
        transform: 'translateX(0)',
        opacity: 1,
      })),
    ]),
    state('open', style({
      transform: 'translateX(0)',
    })),
    transition(':leave', [
      animate(500, style({
        transform: 'translateX(-100%)',
        opacity: 0,
      })),
    ]),
  ],
  ),
];
