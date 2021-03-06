package patches.buildTypes

import jetbrains.buildServer.configs.kotlin.v2018_2.*
import jetbrains.buildServer.configs.kotlin.v2018_2.buildSteps.ScriptBuildStep
import jetbrains.buildServer.configs.kotlin.v2018_2.buildSteps.script
import jetbrains.buildServer.configs.kotlin.v2018_2.ui.*

/*
This patch script was generated by TeamCity on settings change in UI.
To apply the patch, change the buildType with id = 'UnitTestsAndBuild'
accordingly, and delete the patch script.
*/
changeBuildType(RelativeId("UnitTestsAndBuild")) {
    expectSteps {
        script {
            name = "Test And Build"
            scriptContent = """
                #!/bin/bash
                set -e -x
                
                node -v
                npm -v
                
                npm install
                npm run postinstall
                npm run test-ci
                npm run build
            """.trimIndent()
            dockerImage = "buildkite/puppeteer"
        }
    }
    steps {
        update<ScriptBuildStep>(0) {
            clearConditions()
            dockerImagePlatform = ScriptBuildStep.ImagePlatform.Linux
        }
    }

    requirements {
        remove {
            contains("docker.server.osType", "linux")
        }
        add {
            contains("docker.server.osType", "linux", "RQ_1")
        }
    }

    expectDisabledSettings()
    updateDisabledSettings("RQ_1")
}
