#!/bin/bash

#
# TODO:
# [ ] Document script

#
# SUGGESTIONS FOR IMPROVEMENT:
# [ ] Add templates for API tests (Step definitions, Feature files)
# [ ] Add a function for parsing args -- function parse_args() -- switch statement for API or UI project
###############################################

function get_project_type() {
    echo "What is the project type? (api/ui/perf)"
    read project_type
}

function get_project_name() {
    echo "what is the project name?"
    read project_name
}

function set_destination() {
    if [[ "$project_type" == "api" ]]; then
        destination="../projects/APITests/$project_name"
    elif [[ "$project_type" == "ui" ]]; then
        destination="../projects/UITests/$project_name"
    elif [[ "$project_type" == "perf" ]]; then
    {
        projects_path="../projects/"
        perf_path="../projects/PerfTest/"
        if [[ ! -d "$perf_path" ]]; then
            cd projects
            mkdir -p ./PerfTest/$project_name
            echo "Perf Test folder is created at $projects_path"
            destination="../projects/PerfTest/$project_name"
        else
            cd projects/PerfTest
            mkdir $project_name     
            destination="../projects/PerfTest/$project_name"
            echo "Destination is : $destination"
        fi
    }
   else
        echo "[!!] Bad project type. Try again:"
        get_project_type
    fi
}

function copy_project_folder() {
    # if [[ (-d "$destination") && ("$project_type" != "perf") ]]; then
    if [[ "$project_type" == "perf" ]]; then
        echo "NO NEED TO COPY TEMPLATE FILES FOR PERFORMANCE TESTING"
    elif [[ -d "$destination" ]]; then # modified for performance testing
        echo "Project folder $destination already exists!"
        exit 1
    else
        cp -R $template_path/projectTemplate $destination
        echo "[+] Created project folder for $project_name in $destination"
    fi
}

function create_ui_folders() { # This creates the folders needed for a UI project.
    # Note that page_objects_path is needed to be able to create nested folders for PageObjects. Otherwise the cp command in copy_files_to_new_ui_project() will not work
    # Output directories
    features_path="$destination/Features"
    page_objects_path="$destination/PageObjects"
    page_actions_path="$page_objects_path/PageActions"
    page_elements_path="$page_objects_path/PageElements"
    steps_path="$destination/Steps"
    config_path="$destination/config"

    output_dirs=($features_path $page_objects_path $page_actions_path $page_elements_path $steps_path $config_path)

    for path in ${output_dirs[@]}; do
        if [[ ! -d $path ]]; then
            mkdir $path
            echo "Created folder $path"
        else
            echo "Path already exists"
        fi
    done
}

function copy_files_to_new_ui_project() {
    # Output files
    features_path="$destination/Features"
    page_actions_path="$destination/PageObjects/PageActions"
    page_elements_path="$destination/PageObjects/PageElements"
    steps_path="$destination/Steps"

    template_files=$(ls $template_path/feature)

    # Loop through the feature template folder and copy files.
    # Strip .template from filename
    # Reason why this has a lot of elif statements is that the folder structure for the output files has differnt number of directories

    for file in ${template_files[@]}; do
        if [[ $file =~ "feature" && -d $features_path ]]; then
            cp $template_path/feature/$file $(echo $features_path/$file | sed 's/.template//g')
            echo "[+] Created feature file"

        elif [[ $file =~ "pageActions" && ! -e $page_actions_path/$file ]]; then
            cp $template_path/feature/$file $(echo $page_actions_path/$file | sed 's/.template//g')
            echo "[+] Created pageActions file"

        elif [[ $file =~ "pageElements" && ! -e $page_elements_path/$file ]]; then
            cp $template_path/feature/$file $(echo $page_elements_path/$file | sed 's/.template//g')
            echo "[+] Created pageElements file"

        elif [[ $file =~ "steps" && ! -e $steps_path/$file ]]; then
            cp $template_path/feature/$file $(echo $steps_path/$file | sed 's/.template//g')
            echo "[+] Created Steps file"
        fi
    done
}

function add_conf_js() {
    if [[ "$project_type" == "ui" ]]; then
        conf_template="$template_path/config/ui.conf.js"
    fi
    conf_output=$destination/config/$project_type.conf.js
    cat $conf_template | sed "s/PROJECTNAME/$project_name/g" >$conf_output
    echo "[+] Added conf.js ($conf_output)"
}

function create_api_folder_structure() {
    mkdir "$destination/APIs"
    echo "[+] Created APIs directory in $destination"
    mkdir "$destination/APIs/Test_API_Endpoints"
    echo "[+] Created Test_API_Endpoints directory in APIs directory"
    mkdir "$destination/Features"
    echo "[+] Created Features directory in $destination"
    mkdir "$destination/Steps"
    echo "[+] Created Steps directory in $destination"
}

function copy_files_to_new_api_project() {
    # Output files
    features_path="$destination/Features"
    steps_path="$destination/Steps"

    template_files=$(ls $template_path/api/templates)

    # Add test request file
    cp $template_path/api/templates/test_request.js.template $destination"/APIs/Test_API_Endpoints/test_request.js"
    echo "[+] Created request.js file in $project_name project"

    # Add readme file
    cp $template_path/api/readme.md $destination"/readme.md"
    echo "[+] Created readme file in $project_name project"

    # Loop through the feature template folder and copy files.
    # Strip .template from filename

    for file in ${template_files[@]}; do
        if [[ $file =~ "feature" && -d $features_path ]]; then
            cp $template_path/api/templates/$file $(echo $features_path/$file | sed 's/.template//g')
            echo "[+] Created Feature file"
        elif [[ $file =~ "steps" && ! -e $steps_path/$file ]]; then
            cp $template_path/api/templates/$file $(echo $steps_path/$file | sed 's/.template//g')
            echo "[+] Created Steps file"
        fi
    done
}

function create_perf_folder_structure() {
    mkdir "$destination/APIs"
    echo "[+] Created APIs directory in $destination"
    mkdir "$destination/APIs/Test_API_Endpoints"
    echo "[+] Created Test_API_Endpoints directory in APIs directory"
    mkdir "$destination/TestScripts"
    echo "[+] Created Test Scripts directory in $destination"
    # mkdir "$destination/Steps"
    # echo "[+] Created Steps directory in $destination"
}

# Updates the PROJECTNAME values in the template package.json and adds into the new project
function update_package_json() {
    package_json_template="../templates/projectTemplate/package.json" package_json_output="$destination/package.json"
    cat $package_json_template | sed "s/PROJECTNAME/${project_name}/g" >$package_json_output
}

####### Assign variables
template_path="../templates"


####### Get configurations and create template folder #######
get_project_type
get_project_name
set_destination

####### Start copying in template files and correct values #######
echo "[+] Creating $project_type project in $destination"
copy_project_folder

if [[ "$project_type" == "ui" ]]; then
    create_ui_folders
    copy_files_to_new_ui_project
    add_conf_js
elif [[ "$project_type" == "api" ]]; then
    create_api_folder_structure
    copy_files_to_new_api_project
elif [[ "$project_type" == "perf" ]]; then
    create_perf_folder_structure
    # copy_files_to_new_perf_project

fi

# if [[ $? == 0 ]]; then
if [[ ($? == 0) && ("$project_type" != "perf") ]]; then # Modified for accomodating Perf test
    update_package_json
    echo "[+] Updated package.json file"
fi

echo "[+] Script finished."
