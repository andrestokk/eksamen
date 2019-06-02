import { AppManager } from '../Scripts/Services/app_manager.js'
import { Task } from '../Scripts/Models/task.js'

let app = new AppManager()

/* Opening start up dialog when site is opened */
$(document).ready(function() {

    app.loadData()
    wireUpEvents()
    createDialogs()
    initDragDrop()
    initSortable()
    displayData()

});


//Functions
/***
 *      █████▒█    ██  ███▄    █  ▄████▄  ▄▄▄█████▓ ██▓ ▒█████   ███▄    █   ██████ 
 *    ▓██   ▒ ██  ▓██▒ ██ ▀█   █ ▒██▀ ▀█  ▓  ██▒ ▓▒▓██▒▒██▒  ██▒ ██ ▀█   █ ▒██    ▒ 
 *    ▒████ ░▓██  ▒██░▓██  ▀█ ██▒▒▓█    ▄ ▒ ▓██░ ▒░▒██▒▒██░  ██▒▓██  ▀█ ██▒░ ▓██▄   
 *    ░▓█▒  ░▓▓█  ░██░▓██▒  ▐▌██▒▒▓▓▄ ▄██▒░ ▓██▓ ░ ░██░▒██   ██░▓██▒  ▐▌██▒  ▒   ██▒
 *    ░▒█░   ▒▒█████▓ ▒██░   ▓██░▒ ▓███▀ ░  ▒██▒ ░ ░██░░ ████▓▒░▒██░   ▓██░▒██████▒▒
 *     ▒ ░   ░▒▓▒ ▒ ▒ ░ ▒░   ▒ ▒ ░ ░▒ ▒  ░  ▒ ░░   ░▓  ░ ▒░▒░▒░ ░ ▒░   ▒ ▒ ▒ ▒▓▒ ▒ ░
 *     ░     ░░▒░ ░ ░ ░ ░░   ░ ▒░  ░  ▒       ░     ▒ ░  ░ ▒ ▒░ ░ ░░   ░ ▒░░ ░▒  ░ ░
 *     ░ ░    ░░░ ░ ░    ░   ░ ░ ░          ░       ▒ ░░ ░ ░ ▒     ░   ░ ░ ░  ░  ░  
 *              ░              ░ ░ ░                ░      ░ ░           ░       ░  
 *                               ░                                                  
 */

function displayData() {
    let tasks = app.taskService.getTasksByStatus('todo')
    for (let task of tasks) {
        createCard(task);
    }
}

function toggleSidebar() {
    document.body.classList.toggle('sidenav-active');
}

//function for cleaning inputfields. Just sets all the values in a modal to empty.
function cleanInput() {
    $("#input-task-name").val("")
    $("#input-task-desc").val("")
    $("#input-task-point").val("")
    $("#task-modal").dialog("close")
}

//function for creating cards, with value and it creates a HTML template that is appended by a list.
function createCard(task) {
    // let taskText = $("#input-task-name").val()
    // let taskDesc = $("#input-task-desc").val()
    // let taskPoint = $("#input-task-point").val()
    let taskText = task.name
    let taskDesc = task.description
    let taskPoint = task.members[0].name

    $("#backlog-list").append(`
    <li class="task-cards">
    <article>
    <p class="delete-task-button">x</p>
    <p class="edit-button">edit</p>

        <h3 class="task-text">${taskText}</h3>
        <p class="task-point">User: ${taskPoint}</p>
        <p class="read-more">Click for description</p>
        <p class="task-desc">${taskDesc}</p>
        
    </article>
</li>`)
}


//Initial page setup
/***
 *     ██▓ ███▄    █  ██▓▄▄▄█████▓ ██▓ ▄▄▄       ██▓        ██▓███   ▄▄▄        ▄████ ▓█████      ██████ ▓█████▄▄▄█████▓ █    ██  ██▓███  
 *    ▓██▒ ██ ▀█   █ ▓██▒▓  ██▒ ▓▒▓██▒▒████▄    ▓██▒       ▓██░  ██▒▒████▄     ██▒ ▀█▒▓█   ▀    ▒██    ▒ ▓█   ▀▓  ██▒ ▓▒ ██  ▓██▒▓██░  ██▒
 *    ▒██▒▓██  ▀█ ██▒▒██▒▒ ▓██░ ▒░▒██▒▒██  ▀█▄  ▒██░       ▓██░ ██▓▒▒██  ▀█▄  ▒██░▄▄▄░▒███      ░ ▓██▄   ▒███  ▒ ▓██░ ▒░▓██  ▒██░▓██░ ██▓▒
 *    ░██░▓██▒  ▐▌██▒░██░░ ▓██▓ ░ ░██░░██▄▄▄▄██ ▒██░       ▒██▄█▓▒ ▒░██▄▄▄▄██ ░▓█  ██▓▒▓█  ▄      ▒   ██▒▒▓█  ▄░ ▓██▓ ░ ▓▓█  ░██░▒██▄█▓▒ ▒
 *    ░██░▒██░   ▓██░░██░  ▒██▒ ░ ░██░ ▓█   ▓██▒░██████▒   ▒██▒ ░  ░ ▓█   ▓██▒░▒▓███▀▒░▒████▒   ▒██████▒▒░▒████▒ ▒██▒ ░ ▒▒█████▓ ▒██▒ ░  ░
 *    ░▓  ░ ▒░   ▒ ▒ ░▓    ▒ ░░   ░▓   ▒▒   ▓▒█░░ ▒░▓  ░   ▒▓▒░ ░  ░ ▒▒   ▓▒█░ ░▒   ▒ ░░ ▒░ ░   ▒ ▒▓▒ ▒ ░░░ ▒░ ░ ▒ ░░   ░▒▓▒ ▒ ▒ ▒▓▒░ ░  ░
 *     ▒ ░░ ░░   ░ ▒░ ▒ ░    ░     ▒ ░  ▒   ▒▒ ░░ ░ ▒  ░   ░▒ ░       ▒   ▒▒ ░  ░   ░  ░ ░  ░   ░ ░▒  ░ ░ ░ ░  ░   ░    ░░▒░ ░ ░ ░▒ ░     
 *     ▒ ░   ░   ░ ░  ▒ ░  ░       ▒ ░  ░   ▒     ░ ░      ░░         ░   ▒   ░ ░   ░    ░      ░  ░  ░     ░    ░       ░░░ ░ ░ ░░       
 *     ░           ░  ░            ░        ░  ░    ░  ░                  ░  ░      ░    ░  ░         ░     ░  ░           ░              
 *                                                                                                                                        
 */

function wireUpEvents() {

    $('#sideBarButton').on('click', function() {
        toggleSidebar()
    })

    //a function to make a dialog appear on button click
    $("#open-task-modal-button").on("click", function() {
        $("#task-modal").dialog("open")
        $("#task-errormessage").hide()
    });

    /*Functions to check if fields are filled, if not errormessage will appear.*/
    $("#add-project-button").on("click", function() {
        if ($("#input-project-name").val() === "") {
            $("#project-name-errormessage").html("Please enter a project name *")
        } else {
            $("#project-name").html($("#input-project-name").val())
            $("#startup-dialog").dialog("close")
        }
    })

    //This function is given to a single button that appears in the "#task-modal", and checks if the value given is okay.
    //If the value is not empty, it runs three methods defined below.
    $("#task-modal-button").on("click", function() {
        if ($("#input-task-name").val() === "" || ($("#input-task-desc")).val() === "" || ($("#input-task-point")).val() === "") {
            $("#task-errormessage").show()
            $("#task-errormessage").html("Please enter the required fields *")
        } else { <<
            <<
            <<
            <
            HEAD
            createCard();
            cleanInput();
            cardStyle();

            ===
            ===
            =
            let username = $("#input-task-point").val()
            let member = app.memberService.getByUsername(username)
            if (member == undefined) {
                $("#task-errormessage").show()
                $("#task-errormessage").html("Could not find member with that username")
                return
            }
            let name = $("#input-task-name").val()
            let description = $("#input-task-desc").val()
                //TODO: Remove hard coded magic number (id = "1")
            let task = new Task(1, name, description, member)
            app.taskService.addTask(task)
            app.saveData()
            createCard(task)
            cleanInput() >>>
                >>>
                >
                8e2 b1028ce464e08647461bbadbeee75f375b75d
        }

    });

    //Function for toggeling on and off description on each card.
    $(document).on("click", ".read-more", function() {
        $(this).parent().find(".task-desc").toggle()
    });

    //An onclick function with self made animation for deleting a specific card
    $(document).on("click", ".delete-task-button", function() {
        $(this).closest(".task-cards, .done-task").animate({
            width: "toggle",
            height: "toggle"
        }, {
            duration: 200,
            specialEasing: {
                width: "swing",
                height: "easeOutBounce"
            },
        })
    }); <<
    <<
    <<
    <
    HEAD


    //Makes the specified id's droppable, and removes class and adds class on dragged.
    $(function() {
            $("#to-do-list, #doing-list, #backlog-list").droppable({
                drop: function(event, ui) {
                    ui.draggable.removeClass("done-task").addClass("task-cards")
                }
            })
        })
        //Making the done list droppable, and removes and adds class on dropped elements.
    $(function() {
        $("#done-list").droppable({
            drop: function(event, ui) {
                ui.draggable.addClass("done-task").removeClass("task-cards")

            }
        })
    })

    //a function to make a dialog appear on button click
    $("#open-task-modal-button").on("click", function() {
        $("#task-modal").dialog("open")
        $("#task-errormessage").hide()
    });
    //function for cleaning inputfields. Just sets all the values in a modal to empty.
    function cleanInput() {
        $("#input-task-name").val("")
        $("#input-task-desc").val("")
        $("#input-task-point").val("")
        $("#task-modal").dialog("close")
    }

    //function for creating cards, with value and it creates a HTML template that is appended by a list.
    function createCard() {
        let taskText = $("#input-task-name").val()
        let taskDesc = $("#input-task-desc").val()
        let taskPoint = $("#input-task-point").val()

        $("#backlog-list").append(`
        <li class="task-cards">
        <article>
        <p class="delete-task-button">x</p>
        <p class="edit-button">edit</p>

            <h3 class="task-text">Taskname: ${taskText}</h3>
            <p class="task-point">User: ${taskPoint}</p>
            <p class="read-more">Details</p>
            <p class="task-desc">Description: ${taskDesc}</p>
            
        </article>
    </li>`)
    }
};



/* Styling elemnts with Jquery */
$(function() {
    $(".task-container").css({
        "min-height": "800px",
        "grid-column": "auto/ span 2",
        "margin": "0 5px 0 5px",

    })
})
$(function() {
    $(".container-names").css({
        "text-align": "center",
        "color": "#334D6E"

    })
});
$(function() {
    $("#open-task-modal-button").css({
        "border-radius": "100%",
        "position": "relative",
        "top": "50px",
        "height": "40px",
        "width": "40px",
        "font-size": "35px",
        "margin": "0",
        "padding": "0",
        "border": "0",



    })
});



function cardStyle() {
    $(".task-cards").css({
        "height": "auto",
        "min-height": "10px",
        "margin": "20px 0px 20px 0px",
        "text-align": "center",
        "-webkit-box-shadow": "32px 31px 45px -8px rgba(51,77,110,1)",
        "-moz-box-shadow": "32px 31px 45px -8px rgba(51,77,110,1)",
        "box-shadow": "32px 31px 45px -8px rgba(51,77,110,1)",
        "border": "none",
        "borderRadius": "25px"



    })
};
$(function() {
            $("#hearder-newCard").css({
                "fontFamily": "verdana",
                "fontSize": "17px",






            })

        };

        function createDialogs() {

            $("#startup-dialog").dialog({
                modal: true,
                height: 350,
                width: 400,
                resizable: false,
                autoOpen: false,
                show: {
                    effect: "scale"
                },
                hide: {
                    effect: "fade" //BOOOM BOOM BOOOM
                } >>>
                >>>
                >
                8e2 b1028ce464e08647461bbadbeee75f375b75d
            })

            /* The task modal that opens when activated */
            $("#task-modal").dialog({
                modal: true,
                height: 300,
                width: 300,
                autoOpen: false,
                resizable: false,
                show: {
                    effect: "fade"
                },
                hide: {
                    effect: "fade"
                }
            })
        }

        function initDragDrop() {

            //Makes the specified id's droppable, and removes class and adds class on dragged.
            $("#to-do-list, #doing-list, #backlog-list").droppable({
                drop: function(event, ui) {
                    ui.draggable.removeClass("done-task").addClass("task-cards")
                }
            })

            //Making the done list droppable, and removes and adds class on dropped elements.
            $("#done-list").droppable({
                drop: function(event, ui) {
                    ui.draggable.addClass("done-task").removeClass("task-cards")
                }
            })
        }

        function initSortable() {

            // Defines that the div's with a specific id is made sortable and connects sortable on all fields. 
            $("#backlog-list, #to-do-list, #doing-list, #done-list").sortable({
                connectWith: ".connectedSortable"
            }).disableSelection();
        }