<script lang="ts">
    export let data;
    export let form;
    import { enhance } from '$app/forms';
  </script>
  
  <div class="container">
    <h1>My Blog</h1>
    
    <form method="POST" class="form" use:enhance>
      <input 
        type="text" 
        name="title" 
        placeholder="Enter post title..."
        class="input"
      />
      <button type="submit" class="button">Add Post</button>
      
      {#if form?.error}
        <p class="error">{form.error}</p>
      {/if}
      {#if form?.success}
        <p class="success">Post created successfully!</p>
      {/if}
    </form>
  
    <main>
      <div class="posts">
        {#each data.feed as post (post.id)}
          <div class="post">
            <p>{post.title}</p>
          </div>
        {/each}
      </div>
    </main>
  </div>
  
  <style>
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    
    .form {
      margin: 20px 0;
      display: flex;
      gap: 10px;
    }
    
    .input {
      flex: 1;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    
    .button {
      padding: 8px 16px;
      background: #0066cc;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    
    .error {
      color: red;
    }
    
    .success {
      color: green;
    }
    
    .posts {
      margin-top: 20px;
    }
    
    .post {
      padding: 10px;
      border-bottom: 1px solid #eee;
    }
  </style>