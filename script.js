document.addEventListener('DOMContentLoaded', () => {
            const taskInput = document.querySelector("#task-input");
            const addTaskBtn = document.querySelector("#add-task-btn");
            const tasklist = document.querySelector("#task-list");
            const emptyImage = document.querySelector(".empty-image");
            const todosContainer = document.querySelector(".todos-container");

            const toggleEmptyState = () => {
                emptyImage.style.display = tasklist.children.length === 0 ? 'block' : 'none';
            };

            const addTask = (text, completed = false) => {
                const tasktext = text || taskInput.value.trim();
                if (!tasktext) {
                    return;
                }

                const li = document.createElement('li');
                li.innerHTML = `
                    <input type="checkbox" class="checkbox" ${completed ? 'checked' : ''}>
                    <span>${tasktext}</span>
                    <div class="task-buttons">
                        <button class="edit-btn"><i class="fa-regular fa-pen-to-square"></i></button>
                        <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
                    </div>
                `;

                const checkbox = li.querySelector('.checkbox');
                const editBtn = li.querySelector(".edit-btn");
                
                if (completed) {
                    li.classList.add('completed');
                    editBtn.disabled = true;
                    editBtn.style.opacity = '0.5';
                    editBtn.style.pointerEvents = 'none';
                }

                checkbox.addEventListener('change', () => {
                    const isChecked = checkbox.checked;
                    li.classList.toggle('completed', isChecked);
                    editBtn.disabled = isChecked;
                    editBtn.style.opacity = isChecked ? '0.5' : '1';
                    editBtn.style.pointerEvents = isChecked ? 'none' : 'auto';
                });

                editBtn.addEventListener('click', () => {
                    if (!checkbox.checked) {
                        taskInput.value = li.querySelector('span').textContent;
                        li.remove();
                        toggleEmptyState();
                        taskInput.focus();
                    }
                });

                li.querySelector('.delete-btn').addEventListener('click', () => {
                    li.remove();
                    toggleEmptyState();
                });

                tasklist.appendChild(li);
                taskInput.value = '';
                toggleEmptyState();
            };

            // Fixed: Add event listener for the add button
            addTaskBtn.addEventListener('click', (e) => {
                e.preventDefault();
                addTask();
            });

            taskInput.addEventListener("keypress", (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    addTask();
                }
            });

            // Initialize empty state
            toggleEmptyState();
        });