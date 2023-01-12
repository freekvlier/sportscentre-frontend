<script>
    import {signIn, myMSALObj, tokenRequest, loggedInCheck, } from '../auth.js';
    import {loginCheck} from '../services/user-service.js'
    import {getWorkouts} from '../services/workout-service.js'
    import { onMount } from 'svelte';

    let workoutList = [];

    function login(){
        signIn();
        loginCheck();
    }

    function fetchWorkouts(){
        getWorkouts().then(workouts => {
            workoutList = workouts;
        })        
    }

    onMount(() => {
        loggedInCheck().then(test => console.log(test));
    });
</script>

<h1>SportsCentre</h1>
<p>Portal</p>
<button on:click={login}>
	Login
</button>

<button on:click={fetchWorkouts}>Fetch Workouts</button>

{#if workoutList.length > 0}
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Date</th>
        <th>Exercises</th>
      </tr>
    </thead>
    <tbody>
      {#each workoutList as workout}
        <tr>
          <td>{workout.name}</td>
          <td>{workout.date}</td>
          <td>
            <ul>
              {#each workout.exercises as exercise}
              <li class="excercisetitle">{exercise.exerciseType}</li>
              <li>Weight: {exercise.weight}</li>
              <li>Sets: {exercise.sets}</li>
              <li>Reps: {exercise.reps}</li>
              {/each}
            </ul>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
{/if}

<style>
    table {
      border-collapse: collapse;
      width: 100%;
    }
    th, td {
      border: 1px solid #dddddd;
      padding: 8px;
      text-align: left;
    }
    th {
      background-color: #dddddd;
    }
    .excercisetitle {
      list-style-type: none;
      font-weight: bold;
    }
  </style>