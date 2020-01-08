# cube
Timer for turn-based games such as board games

## About
This is a little JavaScript application that works similar to the [DGT Cube 6-Player Game Timer](http://www.digitalgametechnology.com/index.php/products/clocks1/227-dgt-cube). The application cycles through timers with different background colors (players) if any are set. It counts up to the maximum time, if set, and alerts the user when the maximum time is reached. It can also be used without adding any players, if you just need a quick timer that counts up. There is also an option (off by default) to play a sound effect when the timer is up.

You can see it in action on my personal page [here](https://boylebryce.com/cube).

## Usage
Click or tap anywhere in the main region above the controls to start the timer. Once the timer is running, click or tap anywhere in the main region to restart the timer from zero. To set a time limit, enter the time limit as a numeric value in seconds in the `Time limit in seconds` input field in the control bar. 

To add players, click or tap the `Add player` button in the control bar and select a color that will correspond to that player. When it is that player's turn, the background of the main region will match their corresponding color. Clicking or tapping anywhere in the main region will reset the timer and move to the next player. Adding a player will also add their color to a bar below the control bar. Clicking or tapping a player's color below the control bar will remove them from the timer.

Check the `Enable sound alert` to make the timer play a "ding" sound effect when the timer reaches the time limit.

## Planned updates
- [ ] Add an optional name field to player colors that displays when their timer is running
- [ ] Add an option to have the timer count down from the user-set maximum time, instead of counting up from zero
- [ ] Replace player color selection menu with a color wheel to allow for more customization
- [ ] Add the ability to save and load timer setups (players, time limit, any future options)
