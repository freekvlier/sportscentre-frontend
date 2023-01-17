<script>
    import {signIn, signOut, myMSALObj, tokenRequest, loggedInCheck, } from '../auth.js';
    import {loginCheck} from '../services/user-service.js'
    import {getWorkouts, saveWorkout} from '../services/workout-service.js'
    import { onMount } from 'svelte';

    let workoutList = [];
    let userLoggedin = false;
    let workout = {name: "", exercises: []}; //New workout creation
    let exercise = {name: "", weight: 0, sets: 0, reps: 0}; //New workout creation

    onMount(() => {
      setTimeout(() => {loggedInCheck().then(test => userLoggedin = test)}, 400);
    });

    function login(){
        signIn();
        loginCheck();
    }

    function logout(){
        signOut();
        userLoggedin = false;
    }

    function fetchWorkouts(){
        getWorkouts().then(workouts => {
            console.log(workouts);
            workoutList = workouts;
        })        
    }

    function handleSubmit(event) {
      workout.exercises.push(exercise);
      console.log(saveWorkout(workout));
    }
</script>

<h1>SportsCentre</h1>


{#if userLoggedin == true}
  <button id="fetchWorkouts" on:click={fetchWorkouts}>Fetch Workouts</button>
  <button id="logout" on:click={logout}>Logout</button>
{:else}
  <button on:click={login}>Login</button>
{/if}


{#if userLoggedin == true}
  <form on:submit={handleSubmit}>
    <label for="workoutName">Workout Name:</label>
    <input type="text" id="workoutName" bind:value={workout.name}>

    <label for="exerciseName">Exercise Name:</label>
    <input type="text" id="exerciseName" bind:value={exercise.name}>

    <label for="weight">Weight:</label>
    <input type="number" id="weight" bind:value={exercise.weight}>

    <label for="sets">Sets:</label>
    <input type="number" id="sets" bind:value={exercise.sets}>

    <label for="reps">Reps:</label>
    <input type="number" id="reps" bind:value={exercise.reps}>

    <button type="submit">Submit</button>
  </form>


  {#if workoutList.length > 0}
  <h2>Workouts list</h2>
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
                <li class="excercisetitle">{exercise.name}</li>
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

    form {
      margin: 0 auto;
      padding: 2rem;
      width: 80%;
      border-radius: 1rem;
    }
    label {
      margin-bottom: 0.5rem;
    }
    input[type="text"],
    input[type="number"] {
      width: 100%;
      padding: 0.5rem;
      margin-bottom: 1rem;
      border: none;
      border-bottom: 2px solid #ddd;
    }
    button[type="submit"] {
      width: 100%;
      padding: 1rem;
      margin-top: 1rem;
      background-color: #b0b0b0;
      color: rgb(0, 0, 0);
      border: none;
      border-radius: 0.5rem;
      cursor: pointer;
    }
    button[type="submit"]:hover {
      background-color: #060505;
      color: rgb(255, 255, 255);
    }
  </style>